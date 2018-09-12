/* 开发环境  可扩展其余操作 */
var shell = require('shelljs');
var chalk = require('chalk');
var config = require('../config');

var _dev = config.dev;
console.log(chalk.green('> 正在启动web服务\n' + '> 监听端口:' + _dev.port + '\n'));
console.log(chalk.cyan('开发地址:http://localhost:' + _dev.port + '\n'));

shell.exec('webpack-dev-server --open --progress --config  build/dev/wp_dev.js', function (code, stdout, stderr) {
    if (code == 0) {
        console.log(chalk.green(stdout))
    } else {
        console.log(chalk.red('服务异常，请检查配置.\n'))
        console.log(chalk.white(stderr))
    }
})