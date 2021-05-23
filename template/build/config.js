/* 自定义配置 */
var path = require('path'),
    outputPathName = 'dist', // 输出目录名称
    outputPath = '../../' + outputPathName;

module.exports = {
    entry: { // 入口 (多)
        app: ['./src/main.js']
    },
    cssModule: true, // css module
    build: { // 生产环境
        env: '"production"',
        static: path.resolve(__dirname, '../static'), //资源目录
        newStatic: 'static',
        outputPath: outputPath, // 输出目录 
        outputPathName: outputPathName, // gulp & prod
        htmlOption: { // 对应 entry
            app: {
                title: 'mithril webpack',
                template: 'index.html', // 源模板文件
                filename: 'index.html' // 输出文件
            }
        },
        bundleAnalyzerReport: false, // 打包报告
        cssAllInOne:true   // 所有css打包在一个文件中  多入口有共享样式时 请改为 false
    },
    dev: { // 开发环境
        env: '"development"',
        contentBase: path.resolve(__dirname, "/"), // 需要被访问的根目录
        publicPath: "/",
        static: 'static',
        outputPath: path.resolve(__dirname, outputPath), // 临时
        host: 'localhost',
        port: '3001',
        html5Router: false, // html5 router 
        htmlOption: { // 对应 entry
            app: {
                title: 'mithril webpack',
                template: 'index.html', // 源模板文件
                filename: 'index.html' // 输出文件
            }
        },
        proxy: {

        },
        serverHandler: false
        //function(app){
        //   koa app 可以用来做mock
        //   app.get('/some/path', function(req, res) {
        //     res.json({ custom: 'response' });
        //   });
        //}
    }
}
