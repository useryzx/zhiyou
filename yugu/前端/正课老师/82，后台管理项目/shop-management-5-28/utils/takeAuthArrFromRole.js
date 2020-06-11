//takeAuthArrFromRole

const allAuth = require("./allAuth.js");

module.exports = function(role){
    let arr = [];
    allAuth.forEach((el,i) => {

        let authBit = 1<<i;
        if(authBit&role){
            arr.push(el);
        }
    });

    return arr;
}