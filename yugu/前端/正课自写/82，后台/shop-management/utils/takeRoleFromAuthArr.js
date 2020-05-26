// takeRoleFromAuthArr

const allAuth = require("./allAuth.js");

module.exports = function(authArr){
    let authRole = 0;
    authArr.forEach(el => {
        let authIndex = allAuth.indexOf(el);
        if(authIndex>=0){
            authRole = authRole|(1<<authIndex)
        }
    });

    return authRole;
}