
// webpack的配置文件名必须叫 webpack.config.js

// 文件中要用nodejs模块化的形式导出一个对象。(因为此文件要直接运行在nodejs中)

module.exports = {
    // 打包的入口文件
    entry:"./main.js",

    // 打包之后文件的输出位置
    output:{
        path:__dirname+"/dist",
        filename:"out.js"
    }
}