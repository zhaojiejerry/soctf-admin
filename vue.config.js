module.exports = {
    publicPath: './',
    runtimeCompiler: true,
    //  publicPath: '/app/', //署应用包时的基本 URL。  vue-router history模式使用
    //  生产环境构建文件的目录
    outputDir: './admin_pc',
    lintOnSave: false,
    // assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,

    devServer: {
        host: 'localhost', // localhost  192.168.0.101
        port: 8088, // 端口
        open: false, // 启动后打开浏览器
        overlay: {
            //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
            warnings: false,
            errors: true
        },
        // lintOnSave: false,
        proxy: {
            // 配置跨域
            '/baseApi': {
                target: 'http://soctf.rusi.ink/',
                changOrigin: true,
                pathRewrite: {
                    '^/baseApi': '/'
                }
            },
            '/jsonApi': {
                target: 'https://soctf.oss-cn-hangzhou.aliyuncs.com/home/',
                changOrigin: true,
                pathRewrite: {
                    '^/jsonApi': '/'
                }
            }
        }
    },
    configureWebpack: config => {
        config.module.rules.push({
            // 处理markdown文件
            test: /\.md$/,
            // loader: "text-loader",
            use: [{
                    loader: 'text-loader'
                },
                {
                    loader: 'markdown-loader',
                    options: {}
                }
            ]
        })
    }
}