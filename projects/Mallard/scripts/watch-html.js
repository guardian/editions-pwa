const { exec } = require('child_process')
const bundles = require('../html/manifest')
const fs = require('fs')
const chalk = require('chalk')
const { resolve } = require('path')

const startWatchers = () => {
    for (const { project, watchScript, key } of Object.values(bundles)) {
        exec(
            [`cd ../../projects/${project}`, watchScript].join(' && '),
            (err, stdout, stderr) => {
                if (err || stderr) {
                    console.error('Failed watching bundle ' + key)
                    console.error(stderr)
                    return
                }
                console.log(chalk.green(`Watching ${key}`))
            },
        )
    }
}

const main = async () => {
    fs.writeFileSync(
        resolve(__dirname, '..', 'src', 'html-bundle-info.json'),
        JSON.stringify(
            {
                'hey!': `this file is generated at build time. do not edit manually. Bump up the version by editing ./VERSION`,
                bundles,
            },
            undefined,
            '\t',
        ),
    )
    startWatchers()
}
main()
