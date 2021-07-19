import * as iam from '@aws-cdk/aws-iam'
import * as sfn from '@aws-cdk/aws-stepfunctions'
import { Duration } from '@aws-cdk/core'
import { GuStack } from '@guardian/cdk/lib/constructs/core/stack'
import { ProofStepFunctionProps, proofTask } from './constructs'

export const proofArchiverStepFunction = (
    scope: GuStack,
    {
        stack,
        stage,
        deployBucket,
        proofBucket,
        publishBucket,
        backendURL,
        frontsTopicArn,
        frontsTopicRoleArn,
    }: ProofStepFunctionProps,
) => {
    const frontsTopicRole = iam.Role.fromRoleArn(
        scope,
        'proof-fronts-topic-role',
        frontsTopicRoleArn,
    )

    const lambdaParams = {
        stack,
        stage,
        deployBucket,
        proofBucket,
        publishBucket,
        frontsTopicArn,
        frontsTopicRole,
    }
    //Archiver step function
    const issue = proofTask(scope, 'issue', 'Fetch Issue', lambdaParams, {
        backend: backendURL,
    })

    const frontMap = new sfn.Map(scope, 'EditionsArchiverFrontMap', {
        itemsPath: '$.issue.fronts',
        parameters: {
            'issue.$': '$.issue',
            'front.$': '$$.Map.Item.Value',
        },
        resultPath: 'DISCARD', //This makes the output from this be replaced with the input
    })

    const front = proofTask(
        scope,
        'front',
        'Fetch front and images',
        { retry: true, ...lambdaParams },
        {
            backend: backendURL,
        },
    )

    const upload = proofTask(scope, 'upload', 'Upload Issue', lambdaParams)

    const zip = proofTask(scope, 'zip', 'Make issue bundle', lambdaParams)

    const indexerProof = proofTask(
        scope,
        'indexerProof',
        'Generate Index',
        lambdaParams,
        {
            backend: backendURL,
        },
    )

    issue.task.next(frontMap)

    frontMap.iterator(front.task)

    frontMap.next(upload.task)

    upload.task.next(zip.task)

    zip.task.next(indexerProof.task)

    indexerProof.task.next(new sfn.Succeed(scope, 'successfully-archived'))

    const stateMachine = new sfn.StateMachine(
        scope,
        'Archiver State Machine proof',
        {
            definition: issue.task,
            timeout: Duration.minutes(10),
        },
    )

    return stateMachine
}
