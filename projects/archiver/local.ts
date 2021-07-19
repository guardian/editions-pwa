import * as main from './main'
import { Handler, Context } from 'aws-lambda'
import { IssueParams } from './src/tasks/issue'

/*
This file is a shim that allows any of the functions in the step function
to be run locally.
Usage:
    yarn start <function> <inputJson>

Where function is one of those named in main.ts and the inputJson is
a small JSON document that should be used as input for the function.
*/
//When run from terminal

console.log('Node process running on', process.pid)
const task = process.argv[2]
const json = process.argv[3]

if (!(task in main)) {
    console.error(`No task called ${task} present`)
    process.exit(1)
}

const handlers = (main as unknown) as {
    [key: string]: Handler<IssueParams, {}>
}
const handler = handlers[task]

const run = handler(JSON.parse(json), {} as Context, () => {}) as Promise<any> // eslint-disable-line @typescript-eslint/no-explicit-any

run.then(x => {
    console.log(x)
    console.log('Finished.')
    process.exit(0)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}).catch((error: any) => {
    console.error(error)
    process.exit(1)
})
