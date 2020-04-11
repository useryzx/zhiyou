var express = require('express');
var router = express.Router();
var MsgModel = require('../models/MsgModel');
router.get('/label',function(req,res){
    MsgModel.find().exec(function(err,data){
       // data = JSON.parse(JSON.stringify(data));
        var labelList = [];
         data.forEach(function(el){
             el.label.forEach(function(ev){
                 if(labelList.indexOf(ev) == -1){
                     labelList.push(ev)
                 }
             })
         })


         res.render('label',{labelList})
    })
})
module.exports = router;