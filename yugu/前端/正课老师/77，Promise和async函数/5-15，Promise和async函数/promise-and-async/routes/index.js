var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/api/islogin",function(req,res){
    if(Math.random()<0.5){
        res.json({
            err:0,
            msg:"ok"
        });
    }else{
        res.json({
            err:1,
            msg:"not signed"
        });
    }
});

router.get("/api/data",function(req,res){
    res.json({
        err:0,
        msg:"ok",
        data:[1,2,3]
    })
});



module.exports = router;
