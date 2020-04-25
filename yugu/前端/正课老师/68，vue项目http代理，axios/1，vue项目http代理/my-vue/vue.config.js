// vue-cli 3.0。如果要改变项目配置，必须手动在项目根目录下创建vue.config.js
// 导出一个配置对象

module.exports = {
    devServer:{
        proxy:{
            "/proxy":{
                target:"http://127.0.0.1:3000",
                changeOrigin:true,
                pathRewrite:{
                    "^/proxy":""
                }
            }
        }
        // proxy:"http://127.0.0.1:3000"
    }
}