
const User = require("../DAO/User.js");


module.exports = function(req,res,next){
    User.findOne({_id:req.session.userId},{psw:0})
    .then(data=>{
        req.userInfo = data;
        next();
    })
    .catch(err=>{
        throw(err);
    });
}