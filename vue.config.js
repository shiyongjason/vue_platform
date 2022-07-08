const { defineConfig } = require('@vue/cli-service')
const ip = require('ip')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        open: true,
        host: ip.address(), // 本机ip
        port: 3001, // 本机端口
        hot: true, // 开启热加载
    },
    //     module: {
    //         rules: [
    //             {
    //                 test: /\.md$/,
    //                 loader: 'text-loader'
    //             }
    //         ]
    //     }
    // }
    chainWebpack: config => {
        config.module
            .rule('md')
            .test(/\.md/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .options({
                raw: true
            })
    }

})
