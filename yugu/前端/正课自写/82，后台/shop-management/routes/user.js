const express = require('express');
const router = express.Router();
const User = require("../DAO/User.js");
const filters = require("../filters/filters.js");
const middleware = require("../middleware/middleware.js");
const utils = require("../utils/utils.js");
const config = require("../config.js");


// 登录接口
router.post("/login",function(req,res){
    User.findOne({
        account:req.body.account,
        psw:req.body.psw
    },{psw:0})
    .then(data=>{
        if(!data){
            res.json({
                err:1,
                msg:"账号或密码错误"
            });
        }else{
            req.session.userId = data._id;
            data.role = utils.takeAuthArrFromRole(data.role);
            res.json({
                err:0,
                msg:"登录成功",
                userInfo:data
            });
        }
    })
    .catch(err=>{
        throw err;
    })
})

// 查询是否登录
router.get("/islogin",filters.isLogin);
router.get("/islogin",middleware.withUserInfo);
router.get("/islogin",function(req,res){
    req.userInfo.role = utils.takeAuthArrFromRole(req.userInfo.role);
    res.json({
        err:0,
        msg:"已登录",
        userInfo:req.userInfo
    })
});



// 添加管理员用户
router.post(
    "/add-admin",
    filters.isLogin,
    middleware.withUserInfo,
    filters.checkAuthority("admin"),
    filters.checkParams("account"),
    function(req,res){
        const u = utils.takeSearch(req.body,["account"]);
        u.psw = config.defaultUserPsw;
        u.role = 0b00111110;
        new User(u)
        .save()
        .then(data=>{
            res.json({
                err:0,
                msg:"添加成功"
            })
        })
        .catch(err=>{
            throw err;
        })
    }
);

// 添加普通员用户
router.post(
    "/add-account",
    filters.isLogin,
    middleware.withUserInfo,
    filters.checkAuthority("user"),
    filters.checkParams(["account","role"]),
    function(req,res){
        const u = utils.takeSearch(req.body,["account"]);
        u.psw = config.defaultUserPsw;
        u.role = utils.takeRoleFromAuthArr(req.body.role);
        new User(u)
        .save()
        .then(data=>{
            res.json({
                err:0,
                msg:"添加成功"
            })
        })
        .catch(err=>{
            throw err;
        })
    }
);


// 退出登录接口
router.get(
    "/exit",
    filters.isLogin,
    function(req,res){
        req.session.userId = null;
        req.session.destroy(()=>{
            res.json({
                err:0,
                msg:"已退出"
            })
        });
    }
);

// 修改密码接口
router.post(
    "/set-psw",
    filters.isLogin,
    filters.checkParams(["psw","newpsw"]),
    function(req,res){
        const u = utils.takeSearch(req.body,["psw","newpsw"]);
        
        User.findOne({_id:req.session.userId,psw:u.psw})
        .then(data=>{
            if(!data){
                return Promise.reject(1);
            }else{
                data.psw = u.newpsw;
                return data.save();
            }
        })
        .then(d2=>{
            res.json({
                err:0,
                msg:"修改完毕"
            });
        })
        .catch(err=>{
            if(err==1){
                res.json({
                    err:4,
                    msg:"原密码错误"
                });
            }else{
                throw err;
            }
        })
    }
);


module.exports = router;
