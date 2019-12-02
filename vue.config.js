const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
  }
  
module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target:'http://39.108.73.181',
                changeOrigin: true,
                pathRewrite: {
                    '^/':''
                },
                secure:false
            }
        }
    },
    chainWebpack(config){
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            })
            .end();
        }
} 