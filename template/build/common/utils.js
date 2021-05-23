/* 公共方法 */
let path = require('path')
let origin_config = require("../config")
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin')


/* 端口 */
let port = origin_config.dev.port;


// 为sever 添加入口 (多)
exports.addServerEntry = (entrys) => {
    let entryArr = Object.keys(entrys)

    entryArr.map((e) => {
        entrys[e].unshift("webpack-dev-server/client?http://localhost:" + port + "/", "webpack/hot/dev-server")
    })
}


let otherChuks = (key, obj) => { /* 剔除其他入口 避免冗余 */
    let arr = []
    for (let i in obj) {
        if (i != key) arr.push(i)
    }
    return arr;
}

// 配置HtmlWebpackPlugin (多)
exports.HtmlWPMaker = (config) => {
    let arr = []

    for (let i in config.htmlOption) {
        let temp = Object.assign({}, {
            title: 'Spotlight template', // 默认标题
            template: 'index.html', // 源模板文件
            filename: 'index.html', // 输出文件
            inject: true,
            ENV: process.env.NODE_ENV === 'development'
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
                chunksSortMode: 'auto',
                excludeChunks: otherChuks(i, config.htmlOption) //屏蔽其它入口
            })
        }
        arr.push(new HtmlWebpackPlugin(temp))
    }
    return arr;
}

exports.styleLoaders = (isdev) => {
    isdev = isdev || !1;
    let _f = (_d) => {
        return {
            test: /\.css$/,
            include: [_d],
            loader: isdev ? 'style-loader' : MiniCssExtractPlugin.loader,
            options: isdev ? {} : {
                publicPath: "../../"
            }
        }
    },
        _s = (_d, options) => {
            return {
                test: /\.css$/,
                include: [_d],
                loader: 'css-loader',
                options: options || {}
            }
        };
    return [
        _f(/node_modules/),
        _s(/node_modules/),
        _f(/src/),
        _s(/src/, origin_config.cssModule ? {
            modules: {
                localIdentName: "[local]--[hash:base64:5]",
            },
        } : {}),
        {
            test: /\.css$/,
            include: [/src/],
            loader: 'postcss-loader'
        }
    ];
}

exports.filenames = (type) => {
    let _dir = path.posix.join('./static', type + '/[name].[chunkhash].' + type);
    return {
        filename: _dir,
        chunkFilename: _dir
    }
}
