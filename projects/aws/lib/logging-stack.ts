import cdk = require('@aws-cdk/core')
import apigateway = require('@aws-cdk/aws-apigateway')
import lambda = require('@aws-cdk/aws-lambda')
import { Code } from '@aws-cdk/aws-lambda'
import s3 = require('@aws-cdk/aws-s3')
import iam = require('@aws-cdk/aws-iam')
import { CfnOutput, Duration, Tag } from '@aws-cdk/core'
import { Effect } from '@aws-cdk/aws-iam'
import { EndpointType } from '@aws-cdk/aws-apigateway'
import acm = require('@aws-cdk/aws-certificatemanager')

export class LoggingStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        const stackParameter = new cdk.CfnParameter(this, 'stack', {
            type: 'String',
            description: 'Stack',
        })

        const stageParameter = new cdk.CfnParameter(this, 'stage', {
            type: 'String',
            description: 'Stage',
        })

        const loggingCertificateArn = new cdk.CfnParameter(
            this,
            'logging-certificate-arn',
            {
                type: 'String',
                description: 'ARN of ACM certificate for logging endpoint',
            },
        )

        const loggingHostName = new cdk.CfnParameter(this, 'logging-hostname', {
            type: 'String',
            description: 'Hostname for logging endpoint',
        })

        const maxLogSize = new cdk.CfnParameter(this, 'max-log-size', {
            type: 'String',
            description:
                'Maximum size (in bytes) of log data from an individual request',
        })

        const loggingCertificate = acm.Certificate.fromCertificateArn(
            this,
            'logging-certificate',
            loggingCertificateArn.valueAsString,
        )

        const deployBucket = s3.Bucket.fromBucketName(
            this,
            'editions-dist',
            'editions-dist',
        )
        const loggingFunction = () => {
            const fn = new lambda.Function(this, `EditionsLogging`, {
                functionName: `editions-logging-${stageParameter.valueAsString}`,
                runtime: lambda.Runtime.NODEJS_14_X,
                memorySize: 128,
                timeout: Duration.seconds(1),
                code: Code.bucket(
                    deployBucket,
                    `${stackParameter.valueAsString}/${stageParameter.valueAsString}/logging/logging.zip`,
                ),
                handler: 'index.handler',
                environment: {
                    STAGE: stageParameter.valueAsString,
                    STACK: stackParameter.valueAsString,
                    APP: 'editions-logging',
                    MAX_LOG_SIZE: maxLogSize.valueAsString,
                    LOG_ENDPOINT_ENABLED: 'true',
                },
            })
            Tag.add(fn, 'App', `editions-logging`)
            Tag.add(fn, 'Stage', stageParameter.valueAsString)
            Tag.add(fn, 'Stack', stackParameter.valueAsString)
            return fn
        }

        const loggingBackend = loggingFunction()

        const loggingApiPolicyStatement = new iam.PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['execute-api:Invoke'],
            resources: ['*'],
        })
        loggingApiPolicyStatement.addAnyPrincipal()

        const loggingApi = new apigateway.LambdaRestApi(
            this,
            'editions-logging',
            {
                handler: loggingBackend,
                endpointTypes: [EndpointType.EDGE],
                policy: new iam.PolicyDocument({
                    statements: [loggingApiPolicyStatement],
                }),
                defaultMethodOptions: {
                    apiKeyRequired: false,
                },
            },
        )

        const usagePlan = new apigateway.UsagePlan(
            this,
            'editions-logging-usage-plan',
            {
                name: `editions-logging-usage-plan-${stageParameter.valueAsString}`,
                apiStages: [
                    {
                        stage: loggingApi.deploymentStage,
                        api: loggingApi,
                    },
                ],
                // max of 5 million requests a day (100 log messages per user)
                quota: {
                    period: apigateway.Period.DAY,
                    limit: 5000000,
                },
            },
        )

        const apiKey = new apigateway.ApiKey(this, `editions-logging-apikey`, {
            apiKeyName: `editions-logging-${stageParameter.valueAsString}`,
        })
        usagePlan.addApiKey(apiKey)

        const loggingDomainName = new apigateway.DomainName(
            this,
            'logging-domain-name',
            {
                domainName: loggingHostName.valueAsString,
                certificate: loggingCertificate,
                endpointType: apigateway.EndpointType.EDGE,
            },
        )

        loggingDomainName.addBasePathMapping(loggingApi, { basePath: '' })

        new CfnOutput(this, 'Logging-Api-Target-Hostname', {
            description: 'hostname',
            value: `${loggingDomainName.domainNameAliasDomainName}`,
        })
    }
}
