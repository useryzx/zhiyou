// webpack的配置文件名必须叫webpack.config.js
// 文件中要用nodejs模块化的形式导出一个对象。（因为此文件直接运行在nodejs中）
module.exports={
    entry:"./main.js",
    // 打包之后文件的输出位置，和文件名
    output:{
        path:__dirname+"/dist",
        filename:"out.js"
    }
}
// 使用es6模块化开发的项目，必须通过打包工具（例如webpack）将整个项目的js代码打包合并，才能在浏览器或nodejs中执行