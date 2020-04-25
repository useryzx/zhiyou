var express = require('express');
var router = express.Router();


router.get("/api/get",function(req,res){
    console.log(req.query);

    res.json({
        err:0,
        msg:"get-ok"
    })
});

router.post("/api/post",function(req,res){
    console.log(req.body);

    res.json({
        err:0,
        msg:"post-ok"
    })
});


module.exports = router;
