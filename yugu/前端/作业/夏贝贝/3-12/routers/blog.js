var express = require('express');
var router = express.Router();
var MsgModel = require('../models/MsgModel')

router.get('/blog-commit',function(req,res){
    res.render('blog',{})
})
router.get('/blog/list',function(req,res){
  var condition = {};
  condition.label = RegExp(req.query.label)
    MsgModel.find(condition).exec(function(err,data){
        res.render('index',{data})
    })
    
})
router.get('/blog/detail',function(req,res){
    var count = req.query.count;
    count++;
    MsgModel.updateOne({_id:req.query.id},{count:count}).exec(function(err){
        if(!err){
            MsgModel.findOne({_id:req.query.id}).exec(function(err,data){
                if(!err){
                  res.render('blogDetail',data)
                   
                }
            })

        }
        
    })
   
     
 })
 router.post('/blog/detail',function(req,res){

    var replyObj = {
        name:req.body.name,
        content:req.body.content
    }
     
    MsgModel.findOne({_id:req.body.id}).exec(function(err,data){
        if(!err){
            data.reply.push(replyObj);
            data.save(function(){
               res.render('blogDetail',data)
            })
        }
    })
 })
 router.get('/delete',function(req,res){
    // console.log(req.query.id);
     MsgModel.deleteOne({_id:req.query.id}).exec(function(err){
         if(!err){
             res.redirect('/')
         }
     })
     
 })
module.exports = router;