const mongoose = require("mongoose");

const config = require("../config.js")

mongoose.connect(config.db.path,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(res=>{
    console.log("数据库初始化成功");
})
.catch(err=>{
    throw new Error("mongodb初始化失败，请检查mongodb数据库是否就绪");
})


module.exports = mongoose;