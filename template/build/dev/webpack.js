/* dev webpack 配置 */
var webpack = require('webpack')
var utils = require("../common/utils")
var config = require("../config")

var HWP_arr = utils.HtmlWPMaker(config.dev)

module.exports = {
    module: {
        rules: utils.styleLoaders({
            sourceMap: false
        })
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
        publicPath: config.dev.publicPath,
        path: config.dev.outputPath
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: HWP_arr.concat([
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.HotModuleReplacementPlugin()
    ])
}
