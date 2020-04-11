var express=require("express");
var bodyParser=require("body-parser");
var app=express();
app.use(express.static("www"));
app.use(bodyParser.urlencoded({extended:false}));

app.listen(8080,function () {
    console.log("running...");
})