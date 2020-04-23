// webpack默认只能打包js文件，如果需要打包其它类型的文件，需要有这种文件类型的加载器（loader）
// 如果想要webpack打包vue文件，就需要下载并配置vue-loader


// 配置vue-loader
let VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname + "/dist",
        filename: "index.js"
    },
    // module字段用于设置打包时所使用的加载器
    module: {
        // 设置匹配规则，什么格式的文件使用哪种加载器
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test:/\.css$/,
                // 用于打包css文件，以及识别vue文件中的style标签
                use:["vue-style-loader","css-loader"]
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
    ]
}