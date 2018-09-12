/* 生成环境  可扩展其余操作 */
var shell = require('shelljs');
var ora = require('ora')
var chalk = require('chalk')

var spinner = ora('开始打包,请稍后...')
spinner.start()

shell.exec('webpack --config build/prod/wp_prod.js', {
    silent: true
}, function (code, stdout, stderr) {
    spinner.stop()
    if (code == 0) {
        console.log(chalk.green(stdout))
        console.log(chalk.cyan('打包结束.\n'))
    } else {
        console.log(chalk.red('打包异常.\n'))
        console.log(chalk.white(stderr))
    }

})