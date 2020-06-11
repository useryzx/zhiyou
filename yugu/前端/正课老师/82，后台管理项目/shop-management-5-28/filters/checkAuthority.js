// checkAuthority

const utils = require("../utils/utils.js");

module.exports = function(authArr){
    if(typeof authArr=="string"){
        authArr = [authArr];
    }

    let authRole = utils.takeRoleFromAuthArr(authArr);

    return function(req,res,next){
        if(req.userInfo.role&authRole==authRole){
            next();
        }else{
            res.json({
                err:3,
                msg:"您没有权限进行此操作"
            })
        }
    }
}




