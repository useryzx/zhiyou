var express =require("express");
var app =express();
app.use(express.static("www"));
var session =require("express-session");
app.use(session({
    secret:"qwer",
    resave:false,
    saveUninitialized:true
}));
// post
app.use(express.urlencoded({extended:false}));
// 路由
var pageRouter =require("./bin/Routers/pageRouter.js");
var userRouter =require("./bin/Routers/userRouter.js");

app.use(pageRouter);
app.use("/user",userRouter);
app.listen(3000,function(){
    console.log("avatar system running...");
    
});