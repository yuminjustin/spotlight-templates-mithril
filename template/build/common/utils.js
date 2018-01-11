/* 处理函数 */
var path = require('path')
var config = require("../config")
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

exports.assetsPath = function (_path) {
    var _dir = process.env.NODE_ENV === 'production' ? './static' : 'static'
    return path.posix.join(_dir, _path)
}

exports.cssLoaders = function (options) {
    options = options || {}

    var cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    }

    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader]
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                publicPath: '../../',
                fallback: 'style-loader'
            })
        } else {
            return ['style-loader'].concat(loaders)
        }

    }

    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', {
            indentedSyntax: true
        }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus')
    }
}

exports.styleLoaders = function (options) {
    var output = []
    var loaders = exports.cssLoaders(options)

    for (var extension in loaders) {
        var loader = loaders[extension]

        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}

exports.resolve = function (dir) {
    return path.join(__dirname, '..', dir)
}

exports.HtmlWPMaker = function (config) {
    var arr = []
    for (var i in config.htmlOption) {
        var temp = {
            title: config.htmlOption[i].title || 'Spotlight scaffold',
            template: config.htmlOption[i].template || 'index.html', // 源模板文件
            filename: config.htmlOption[i].filename || 'index.html', // 输出文件
            inject: true
        }
        if (config.env == '"development"') {
            temp.chunks = [i];
        }
        else {
            temp.minify = {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
            temp.chunksSortMode = 'dependency'
            // 多入口时 在配置中定义exclude 去屏蔽其他 chuck
            // eg.  exclude: ['app']
            if(config.htmlOption[i].exclude){
                temp.excludeChunks = config.htmlOption[i].exclude
            }
        }
        arr.push(new HtmlWebpackPlugin(temp))
    }
    return arr;
}

// 为sever 添加入口 
exports.addServerEntry  = function (entry){
    
    var entryArr = Object.keys(entry)
 
    entryArr.map(function(e){
        entry[e].unshift("webpack-dev-server/client?http://localhost:" + config.dev.port + "/","webpack/hot/dev-server")
    })
 
}
