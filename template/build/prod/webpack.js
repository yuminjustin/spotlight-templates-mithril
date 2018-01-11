/* build webpack 配置 */
var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var utils = require("../common/utils")
var config = require("../config")

var HWP_arr = utils.HtmlWPMaker(config.build)

var webpackConfig = {
    module: {
        rules: utils.styleLoaders({
            sourceMap: true,
            extract: true
        })
    },
    output: {
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
        path: path.resolve(__dirname, config.build.outputPath)
    },
    devtool: '#source-map',
    plugins: HWP_arr.concat([
        new webpack.DefinePlugin({
            'process.env': config.build.env
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../../node_modules')
                    ) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new CopyWebpackPlugin([{
            from: config.build.static,
            to: config.build.newStatic,
            ignore: ['.*']
        }])
    ])
}


// webpack 打包报告 
if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig
