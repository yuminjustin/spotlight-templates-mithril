/* 开发环境 */
var opn = require('opn')
var path = require('path')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var express = require('express')
var merge = require('webpack-merge')
var webpackBase = require('../webpack.config.base')
var webpackDev = require('./webpack')
var utils = require("../common/utils")
var config = require("../config")

utils.addServerEntry(webpackBase.entry)

var compiler = webpack(merge(webpackBase, webpackDev));
var server = new WebpackDevServer(compiler, {
    overlay: { //当有编译错误或者警告的时候显示一个全屏overlay
        errors: true,
        warnings: true,
    },
    hot: true,
    inline: true,
    historyApiFallback: config.dev.html5Router || false,
    compress: true,
    proxy: config.dev.proxy,
    before: function (app) {
        // 静态文件夹
        var staticPath = path.posix.join(config.dev.publicPath, config.dev.static)
        app.use(staticPath, express.static('./static'))
        config.dev.serverHandler && config.dev.serverHandler(app)
    },
    staticOptions: {},
    clientLogLevel: "info", // 控制台信息 输出方式
    quiet: true, // 是否不打印 控制台信息
    noInfo: false, // 
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    headers: {
        "X-Custom-Header": "yes"
    },
    stats: {
        colors: true
    }
});

// 自动打开浏览器
opn('http://localhost:' + config.dev.port)

server.listen(config.dev.port, "localhost", function () {
    console.log('> 正在启动\n' + '> 监听端口:' + config.dev.port)
});
