import { run } from './main'
//When run from terminal

console.log(process.pid)
const date = process.argv[2] || '2019-07-09'
run(date)
    .then(() => {
        process.exit(0)
    })
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
