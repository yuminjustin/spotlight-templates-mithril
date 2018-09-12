/* prod webpack 配置 */
var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var UglifyJsPlugin = require("uglifyjs-webpack-plugin");
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var utils = require('../common/utils')
var webpackBase = require("../common/base")
var config = require('../config')

var _build = config.build,
    HWP_arr = utils.HtmlWPMaker(_build),
    webpackConfig = {
        mode: 'production',
        module: {
            rules: utils.styleLoaders()
        },
        output: Object.assign(utils.filenames('js'),{
            path: path.resolve(__dirname, _build.outputPath)
        }),
        devtool: '#source-map',
        plugins: HWP_arr.concat([
            new webpack.DefinePlugin({
                'process.env': _build.env
            }),
            new CleanWebpackPlugin(_build.outputPathName, {
                root: path.resolve(__dirname, '../../')
            }),
            new MiniCssExtractPlugin(utils.filenames('css')),
            new CopyWebpackPlugin([{
                from: _build.static,
                to: _build.newStatic,
                ignore: ['.*']
            }])
        ]),
        optimization: { /* 参考 webpack 官方示例配置 特殊要求自行配置*/
            /* https://github.com/webpack/webpack/tree/master/examples */
            occurrenceOrder: true,
            runtimeChunk: {
                name: "manifest"
            },
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: _build.cssAllInOne ? function (module) {
                            return (
                                module.resource &&
                                /\.js$/.test(module.resource) &&
                                module.resource.indexOf(
                                    path.join(__dirname, '../../node_modules')
                                ) === 0
                            )
                        } : /node_modules/,
                        chunks: "all",
                        name: "vendor",
                        priority: 10,
                        enforce: true
                    },
                    commons: {
                        chunks: "initial",
                        minChunks: 2,
                        maxInitialRequests: 5,
                        minSize: 0
                    }
                }
            },
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }),
                new OptimizeCSSPlugin({})
            ]
        }
    }


// webpack 打包报告 
if (_build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}


module.exports = merge(webpackBase, webpackConfig)
