import { CfnOutput, Construct, Duration, Tag } from '@aws-cdk/core'
import { Code } from '@aws-cdk/aws-lambda'
import lambda = require('@aws-cdk/aws-lambda')
import { IBucket } from '@aws-cdk/aws-s3'
import { proofArchiverStepFunction } from './proof-step-function'
import { publishArchiverStepFunction } from './publish-step-function'
import iam = require('@aws-cdk/aws-iam')
import { LambdaFunction } from '@aws-cdk/aws-events-targets'
import { Rule } from '@aws-cdk/aws-events'
import { GuStack } from '@guardian/cdk/lib/constructs/core/stack'

export const s3EventListenerFunction = (
    scope: Construct,
    app: string,
    stack: string,
    stage: string,
    deployBucket: IBucket,
    proofStateMachineArn: string,
    publishStateMachineArn: string,
    frontsRoleARN: string,
    backendURL: string,
) => {
    const fn = new lambda.Function(
        scope,
        'EditionsProofArchiverS3EventListener',
        {
            functionName: `editions-proof-archiver-s3-event-listener-${stage}`,
            runtime: lambda.Runtime.NODEJS_14_X,
            timeout: Duration.minutes(5),
            memorySize: 256,
            code: Code.bucket(
                deployBucket,
                `${stack}/${stage}/editions-archiver/editions-archiver.zip`,
            ),
            handler: 'index.invoke',
            environment: {
                stage: stage,
                proofStateMachineARN: proofStateMachineArn,
                publishStateMachineARN: publishStateMachineArn,
                arn: frontsRoleARN,
                backend: backendURL,
            },
        },
    )
    Tag.add(fn, 'App', app)
    Tag.add(fn, 'Stage', stage)
    Tag.add(fn, 'Stack', stack)
    return fn
}

export const constructTriggeredStepFunction = (
    scope: GuStack,
    stack: string,
    stage: string,
    deployBucket: IBucket,
    proofArchive: IBucket,
    publishArchive: IBucket,
    backendURL: string,
    frontsTopicARN: string,
    frontsTopicRoleARN: string,
    guNotifyServiceApiKeyParameter: string,
    frontsRoleARN: string,
    cmsFrontsAccountIdParameter: string,
    publishedBucket: IBucket,
    frontsAccessArn: string,
) => {
    const proofArchiverStateMachine = proofArchiverStepFunction(scope, {
        stack: stack,
        stage: stage,
        deployBucket,
        proofBucket: proofArchive,
        publishBucket: publishArchive,
        backendURL,
        frontsTopicArn: frontsTopicARN,
        frontsTopicRoleArn: frontsTopicRoleARN,
        guNotifyServiceApiKey: guNotifyServiceApiKeyParameter,
    })

    new CfnOutput(scope, 'proof-archiver-state-machine-arn', {
        description: 'ARN for proof archiver state machine',
        exportName: `proof-archiver-state-machine-arn-${stage}`,
        value: proofArchiverStateMachine.stateMachineArn,
    })

    const publishArchiverStateMachine = publishArchiverStepFunction(scope, {
        stack: stack,
        stage: stage,
        deployBucket,
        proofBucket: proofArchive,
        publishBucket: publishArchive,
        backendURL,
        frontsTopicArn: frontsTopicARN,
        frontsTopicRoleArn: frontsTopicRoleARN,
        guNotifyServiceApiKey: guNotifyServiceApiKeyParameter,
    })

    new CfnOutput(scope, 'publish-archiver-state-machine-arn', {
        description: 'ARN for publish archiver state machine',
        exportName: `publish-archiver-state-machine-arn-${stage}`,
        value: publishArchiverStateMachine.stateMachineArn,
    })

    const archiveS3EventListener = s3EventListenerFunction(
        scope,
        'editions-proof-archiver-s3-event-listener',
        stack,
        stage,
        deployBucket,
        proofArchiverStateMachine.stateMachineArn,
        publishArchiverStateMachine.stateMachineArn,
        frontsRoleARN,
        backendURL,
    )

    // Read events from cloudwatch event bus and send to listener lambda
    new Rule(scope, 'cmsFronts-editions-events', {
        eventPattern: {
            source: ['aws.s3'],
            detailType: ['AWS API Call via CloudTrail'],
            account: [cmsFrontsAccountIdParameter],
            detail: {
                eventSource: ['s3.amazonaws.com'],
                eventName: ['PutObject'],
                requestParameters: {
                    bucketName: [publishedBucket.bucketName],
                },
            },
        },
        targets: [new LambdaFunction(archiveS3EventListener)],
    })

    new CfnOutput(scope, 'archiver-s3-event-listener-arn', {
        description: 'ARN for proof-archiver state machine trigger lambda',
        exportName: `proof-archiver-s3-event-listener-arn-${stage}`,
        value: archiveS3EventListener.functionArn,
    })

    new lambda.CfnPermission(
        scope,
        'PublishedEditionsProofArchiverS3EventListenerInvokePermission',
        {
            principal: 's3.amazonaws.com',
            functionName: archiveS3EventListener.functionName,
            action: 'lambda:InvokeFunction',
            sourceAccount: cmsFrontsAccountIdParameter,
            sourceArn: publishedBucket.bucketArn,
        },
    )

    archiveS3EventListener.addToRolePolicy(
        new iam.PolicyStatement({
            actions: ['sts:AssumeRole'],
            resources: [frontsAccessArn],
        }),
    )
    proofArchiverStateMachine.grantStartExecution(archiveS3EventListener)
    publishArchiverStateMachine.grantStartExecution(archiveS3EventListener)
}
