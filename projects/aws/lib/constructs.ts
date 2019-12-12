import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'
import { Code, FunctionProps } from '@aws-cdk/aws-lambda'
import { Duration, Tag } from '@aws-cdk/core'
import { toTitleCase } from './tools'
import * as s3 from '@aws-cdk/aws-s3'
import * as iam from '@aws-cdk/aws-iam'
import * as sfn from '@aws-cdk/aws-stepfunctions'
import * as tasks from '@aws-cdk/aws-stepfunctions-tasks'
import { RetryProps } from '@aws-cdk/aws-stepfunctions'

export interface StepFunctionProps {
    stack: string
    stage: string
    deployBucket: s3.IBucket
    proofBucket: s3.IBucket
    publishBucket: s3.IBucket
    backendURL: string
    frontsTopicArn: string
    frontsTopicRoleArn: string
    guNotifyServiceApiKey: string
}
export interface Params {
    stack: string
    stage: string
    deployBucket: s3.IBucket
    proofBucket: s3.IBucket
    publishBucket: s3.IBucket
    frontsTopicArn: string
    frontsTopicRole: iam.IRole
    retry?: RetryProps | boolean
}

export const taskLambda = (
    scope: cdk.Construct,
    name: string,
    {
        stack,
        stage,
        deployBucket,
        proofBucket,
        publishBucket,
        frontsTopicArn,
        frontsTopicRole,
    }: Params,
    environment?: { [key: string]: string },
    overrides?: Partial<FunctionProps>,
) => {
    const lambdaName = `EditionsArchiver${toTitleCase(name)}`
    const fn = new lambda.Function(scope, lambdaName, {
        functionName: `editions-archiver-stepmachine-${name}-${stage}`,
        runtime: lambda.Runtime.NODEJS_10_X,
        timeout: Duration.minutes(5),
        memorySize: 1500,
        code: Code.bucket(
            deployBucket,
            `${stack}/${stage}/archiver/archiver.zip`,
        ),
        handler: `index.${name}`,
        environment: {
            ...environment,
            stage: stage,
            proofBucket: proofBucket.bucketName,
            publishBucket: publishBucket.bucketName,
            topic: frontsTopicArn,
            role: frontsTopicRole.roleArn,
        },
        initialPolicy: [
            new iam.PolicyStatement({
                actions: ['*'],
                resources: [
                    proofBucket.arnForObjects('*'),
                    proofBucket.bucketArn,
                    publishBucket.arnForObjects('*'),
                    publishBucket.bucketArn,
                ],
            }),
            new iam.PolicyStatement({
                actions: ['sts:AssumeRole'],
                resources: [frontsTopicRole.roleArn],
            }),
        ],
        ...overrides,
    })
    Tag.add(fn, 'App', `editions-archiver-${name}`)
    Tag.add(fn, 'Stage', stage)
    Tag.add(fn, 'Stack', stack)
    return fn
}

export const task = (
    scope: cdk.Construct,
    name: string,
    desc: string,
    { retry, ...lambdaParams }: Params,
    environment?: { [key: string]: string },
    overrides?: Partial<FunctionProps>,
) => {
    const lambda = taskLambda(scope, name, lambdaParams, environment, overrides)

    const task = new sfn.Task(scope, [name, desc].join(': '), {
        task: new tasks.InvokeFunction(lambda),
    })
    if (retry == true) {
        task.addRetry(retry === true ? {} : retry)
    }
    return { lambda, task }
}
