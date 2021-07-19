#!/usr/bin/env node
import 'source-map-support/register'
import cdk = require('@aws-cdk/core')
import { EditionsStack } from '../lib/aws-stack'

const app = new cdk.App()
new EditionsStack(app, 'EditionsStack', {
    // app: 'editions-stack',
    description: 'Editions backend/archiver/listener stack',
    migratedFromCloudFormation: false,
    stack: 'mobile',
})
