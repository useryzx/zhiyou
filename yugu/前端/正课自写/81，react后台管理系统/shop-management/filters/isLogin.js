// isLogin

module.exports = function(req,res,next){
    if(req.session.userId){
        next();
    }else{
        res.json({
            err:2,
            msg:"未登录"
        })
    }
}

