var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var ora = require('ora')
var rm = require('rimraf')
var chalk = require('chalk')
var webpackBase = require("../webpack.config.base")
var webpackProd = require("./webpack")
var config = require("../config")


var spinner = ora('正在打包,请稍后...')

spinner.start()

rm(path.resolve(__dirname, config.build.outputPath, config.build.newStatic), err => {

    if (err) throw err

    webpack(merge(webpackBase, webpackProd), function (err, stats) {
        spinner.stop()
        if (err) throw err

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('打包失败.\n'))
            process.exit(1)
        }
        console.log(chalk.cyan('打包成功.\n'))
    })

})