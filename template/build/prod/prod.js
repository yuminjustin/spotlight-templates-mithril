/* prod webpack 配置 */
let path = require('path')
let webpack = require('webpack')
let {merge} = require('webpack-merge')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let TerserPlugin = require('terser-webpack-plugin');
let CssMinimizerPlugin  = require('css-minimizer-webpack-plugin');
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
let utils = require('../common/utils')
let webpackBase = require("../common/base")
let config = require('../config')

let _build = config.build,
    HWP_arr = utils.HtmlWPMaker(_build),
    webpackConfig = {
        mode: 'production',
        module: {
            rules: utils.styleLoaders()
        },
        output: Object.assign(utils.filenames('js'),{
            path: path.resolve(__dirname, _build.outputPath)
        }),
        devtool: false,
        plugins: HWP_arr.concat([
            new webpack.DefinePlugin({
                'process.env': _build.env
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin(utils.filenames('css')),
            new CopyWebpackPlugin({
                patterns: [{
                    from: _build.static,
                    to: _build.newStatic,
                    globOptions: {
                        ignore: ['.*']
                    }
                }]

            })
        ]),
        optimization: { /* 参考 webpack 官方示例配置 特殊要求自行配置*/
            /* https://github.com/webpack/webpack/tree/master/examples */
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
                new TerserPlugin({}),
                new CssMinimizerPlugin({})
            ]
        }
    }


// webpack 打包报告 
if (_build.bundleAnalyzerReport) {
    let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}


module.exports = merge(webpackBase, webpackConfig)
