import { Handler } from 'aws-lambda'
import { StepFunctions } from 'aws-sdk'
import { randomBytes } from 'crypto'
import {
    Attempt,
    attempt,
    Failure,
    hasFailed,
    hasSucceeded,
    withFailureMessage,
    IssuePublicationIdentifier,
    IssuePublicationActionIdentifier,
    EditionListPublicationAction,
} from '../../common'
import { IssueParams } from '../tasks/issue'
import { fetchfromCMSFrontsS3, GetS3ObjParams } from '../utils/s3'
import { parseIssueActionRecord, parseEditionListActionRecord } from './parser'
import { URL } from '../utils/backend-client'
import fetch from 'node-fetch'

export interface Record {
    s3: { bucket: { name: string }; object: { key: string } }
    eventTime: string
} //partial of https://docs.aws.amazon.com/AmazonS3/latest/dev/notification-content-structure.html

export interface CloudWatchEvent {
    detail: { requestParameters: { bucketName: string; key: string } }
    time: string
}

const sf = new StepFunctions({
    region: 'eu-west-1',
})

const getRuntimeInvokeStateMachineFunction = (stateMachineArn: string) => {
    return async (
        issuePublication: IssuePublicationActionIdentifier,
    ): Promise<IssuePublicationIdentifier | Failure> => {
        const invoke: IssueParams = {
            issuePublication,
        }
        const run = await attempt(
            sf
                .startExecution({
                    stateMachineArn,
                    input: JSON.stringify(invoke),
                    name: `issue ${invoke.issuePublication.issueDate} ${
                        invoke.issuePublication.version
                    } ${randomBytes(2).toString('hex')}`.replace(
                        /\W/g,
                        '-', // see character restrictions
                        //https://docs.aws.amazon.com/step-functions/latest/apireference/API_StartExecution.html
                    ),
                })
                .promise(),
        )
        if (hasFailed(run)) {
            const msg = `⚠️ Invocation of ${JSON.stringify(
                issuePublication,
            )} failed.`
            console.error(msg)
            return withFailureMessage(run, msg)
        }
        console.log(
            `Invocation of step function for ${JSON.stringify(
                issuePublication,
            )} successful`,
        )
        return issuePublication
    }
}

export interface InvokerDependencies {
    proofStateMachineInvoke: (
        issuePub: IssuePublicationActionIdentifier,
    ) => Promise<IssuePublicationIdentifier | Failure>
    publishStateMachineInvoke: (
        issuePub: IssuePublicationActionIdentifier,
    ) => Promise<IssuePublicationIdentifier | Failure>
    s3fetch: (params: GetS3ObjParams) => Promise<string>
}

const invokeEditionList = async (
    Records: Record[],
    dependencies: InvokerDependencies,
) => {
    const maybeEditionListPromises: Promise<
        Attempt<EditionListPublicationAction>
    >[] = Records.map(async r => {
        return await parseEditionListActionRecord(r, dependencies.s3fetch)
    })

    const maybeEditionLists: Attempt<
        EditionListPublicationAction
    >[] = await Promise.all(maybeEditionListPromises)

    // explicitly ignore all files that didn't parse,
    const editionLists: EditionListPublicationAction[] = maybeEditionLists.filter(
        hasSucceeded,
    )

    console.log('Found following edition lists:', JSON.stringify(editionLists))

    return await Promise.all(
        editionLists.map(async data => {
            const editionList = data.content
            const endpoint = `${URL}editions`
            console.log(`Posting editions list to ${endpoint}`)
            const response = await fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify(editionList),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log(
                'Editionlist post response: ',
                `${response.status} ${response.statusText}`,
            )

            // we just need to return success or failue in a form IssuePublicationIdentifier
            // so it can be reported upstream and logs all success or failed tasks
            return response.ok
                ? ({ version: 'success' } as IssuePublicationIdentifier)
                : fail(response.statusText)
        }),
    )
}

const invokePublishProof = async (
    Records: Record[],
    dependencies: InvokerDependencies,
) => {
    const maybeIssuesPromises: Promise<
        Attempt<IssuePublicationActionIdentifier>
    >[] = Records.map(async r => {
        return await parseIssueActionRecord(r, dependencies.s3fetch)
    })

    const maybeIssues: Attempt<
        IssuePublicationActionIdentifier
    >[] = await Promise.all(maybeIssuesPromises)

    // explicitly ignore all files that didn't parse,
    const issues: IssuePublicationActionIdentifier[] = maybeIssues.filter(
        hasSucceeded,
    )

    console.log('Found following issues:', JSON.stringify(issues))

    return await Promise.all(
        issues.map(issuePublicationAction => {
            if (issuePublicationAction.action === 'proof')
                return dependencies.proofStateMachineInvoke(
                    issuePublicationAction as IssuePublicationActionIdentifier,
                )
            else if (issuePublicationAction.action === 'publish')
                return dependencies.publishStateMachineInvoke(
                    issuePublicationAction as IssuePublicationActionIdentifier,
                )
            else return fail(`Unknown action ${issuePublicationAction.action}`)
        }),
    )
}

export const internalHandler = async (
    Records: Record[],
    dependencies: InvokerDependencies,
) => {
    const issueRuns = await invokePublishProof(Records, dependencies)
    const editionsListRuns = await invokeEditionList(Records, dependencies)

    const successfulIssueInvocations = issueRuns
        .filter(hasSucceeded)
        .map(issue => `✅ Invocation of ${JSON.stringify(issue)} succeeded.`)

    const successfulEditionListInvocations = editionsListRuns
        .filter(hasSucceeded)
        .map(() => `✅ Invocation of edition list succeeded.`)

    const invocations = issueRuns.concat(editionsListRuns)
    const failedInvocations = invocations.filter(hasFailed)
    console.error(JSON.stringify([...failedInvocations]))

    if (
        successfulIssueInvocations.length == 0 &&
        successfulEditionListInvocations.length == 0
    )
        throw new Error('No invocations were made.')

    return [
        ...successfulIssueInvocations,
        ...successfulEditionListInvocations,
        ...failedInvocations,
    ]
}

const eventToRecord = (event: CloudWatchEvent): Record => {
    return {
        s3: {
            bucket: { name: event.detail.requestParameters.bucketName },
            object: { key: event.detail.requestParameters.key },
        },
        eventTime: event.time,
    }
}

export const handler: Handler<
    CloudWatchEvent,
    (string | Failure)[]
> = async inputData => {
    const proofStateMachineArnEnv = 'proofStateMachineARN'
    const proofStateMachineArn = process.env[proofStateMachineArnEnv]
    const publishStateMachineArnEnv = 'publishStateMachineARN'
    const publishStateMachineArn = process.env[publishStateMachineArnEnv]

    if (proofStateMachineArn == null) {
        throw new Error('No Proof State Machine ARN configured')
    }
    if (publishStateMachineArn == null) {
        throw new Error('No Publish State Machine ARN configured')
    }

    console.log('input data', inputData)
    const Records = [eventToRecord(inputData)]

    console.log(
        `Attempting to invoke Proof/Publish State Machines after receiving records:`,
        inputData,
    )

    const runtimeDependencies: InvokerDependencies = {
        proofStateMachineInvoke: getRuntimeInvokeStateMachineFunction(
            proofStateMachineArn,
        ),
        publishStateMachineInvoke: getRuntimeInvokeStateMachineFunction(
            publishStateMachineArn,
        ),
        s3fetch: fetchfromCMSFrontsS3,
    }

    return internalHandler(Records, runtimeDependencies)
}
