var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/avatar60", {
    useNewUrlParser: true
}, function (err) {
    if (err) {
        console.log(err);

    } else {
        console.log("db");

    }
});
module.exports =mongoose;