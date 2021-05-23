/* 生成环境  可扩展其余操作 */
let shell = require('shelljs');
let ora = require('ora')
let chalk = require('chalk')

let spinner = ora('开始打包,请稍后...')
spinner.start()

shell.exec('cross-env NODE_ENV=production webpack --config build/prod/prod.js', {
    silent: true
}, (code, stdout, stderr) => {
    spinner.stop()
    if (code == 0) {
        console.log(chalk.green(stdout))
        console.log(chalk.cyan('打包结束.\n'))
    } else {
        console.log(chalk.red('打包异常.\n'))
        console.log(chalk.white(stderr))
    }

})