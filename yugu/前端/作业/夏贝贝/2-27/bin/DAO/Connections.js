var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/student11", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (!err) {
        console.log("数据库已连接");

    }
});
module.exports=mongoose;