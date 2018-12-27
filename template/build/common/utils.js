/* 公共方法 */
var path = require('path')
var origin_config = require("../config")
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')


/* 端口 */
var port = origin_config.dev.port;


// 为sever 添加入口 (多)
exports.addServerEntry = function (entrys) {
    var entryArr = Object.keys(entrys)

    entryArr.map(function (e) {
        entrys[e].unshift("webpack-dev-server/client?http://localhost:" + port + "/", "webpack/hot/dev-server")
    })
}


var otherChuks = function (key, obj) { /* 剔除其他入口 避免冗余 */
    var arr = []
    for (var i in obj) {
        if (i != key) arr.push(i)
    }
    return arr;
}

// 配置HtmlWebpackPlugin (多)
exports.HtmlWPMaker = function (config) {
    var arr = []

    for (var i in config.htmlOption) {
        var temp = Object.assign({}, {
            title: 'Spotlight template', // 默认标题
            template: 'index.html', // 源模板文件
            filename: 'index.html', // 输出文件
            inject: true
        }, config.htmlOption[i])

        if (config.env == '"development"') {
            temp.chunks = [i];
        } else { /* production */
            temp = Object.assign(temp, {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency',
                excludeChunks: otherChuks(i, config.htmlOption) //屏蔽其它入口
            })
        }
        arr.push(new HtmlWebpackPlugin(temp))
    }
    return arr;
}

exports.styleLoaders = function (isdev) {
    isdev = isdev || !1;
    return [{
            test: /\.css$/,
            include: [/node_modules/],
            use: [
                isdev ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        },
        {
            test: /\.css$/,
            include: [/src/],
            use: [
                isdev ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader?modules&localIdentName=[local]_[hash:base64:5]',
                'postcss-loader'
            ]
        }
    ]
}

exports.filenames = function (type) {
    var _dir = './static';
    return {
        filename: path.posix.join(_dir, type + '/[name].[chunkhash].' + type),
        chunkFilename: path.posix.join(_dir, type + '/[name].[chunkhash].' + type)
    }
}
