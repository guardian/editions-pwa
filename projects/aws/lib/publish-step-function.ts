import * as iam from '@aws-cdk/aws-iam'
import * as sfn from '@aws-cdk/aws-stepfunctions'
import { Duration } from '@aws-cdk/core'
import { GuStack } from '@guardian/cdk/lib/constructs/core/stack'
import { PublishStepFunctionProps, publishTask } from './constructs'

export const publishArchiverStepFunction = (
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
        guNotifyServiceApiKey,
    }: PublishStepFunctionProps,
) => {
    const frontsTopicRole = iam.Role.fromRoleArn(
        scope,
        'publish-fronts-topic-role',
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

    const environment = {
        backend: backendURL,
        gu_notify_service_api_key: guNotifyServiceApiKey,
    }

    const copier = publishTask(
        scope,
        'copier',
        'Copy Issue',
        lambdaParams,
        environment,
    )

    const indexerPublish = publishTask(
        scope,
        'indexerPublish',
        'Generate Index',
        lambdaParams,
        environment,
    )

    const notification = publishTask(
        scope,
        'notification',
        'Schedule device notification',
        lambdaParams,
        environment,
    )

    copier.task.next(indexerPublish.task)

    indexerPublish.task.next(notification.task)

    notification.task.next(
        new sfn.Succeed(scope, 'publish-successfully-archived'),
    )

    const stateMachine = new sfn.StateMachine(
        scope,
        `Archiver State Machine Publish`,
        {
            definition: copier.task,
            timeout: Duration.minutes(10),
        },
    )

    return stateMachine
}
