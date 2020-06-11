// checkAuthority

const utils = require("../utils/utils.js");

module.exports = function(authArr){
    if(typeof authArr=="string"){
        authArr = [authArr];
    }

    let authRole = utils.takeRoleFromAuthArr(authArr);

    return function(req,res,next){
        // console.log(authRole);
        // console.log(req.userInfo.role);
        // console.log(req.userInfo.role&authRole);

        if((req.userInfo.role&authRole)==authRole){
            next();
        }else{
            res.json({
                err:3,
                msg:"您没有权限进行此操作"
            })
        }
    }
}




