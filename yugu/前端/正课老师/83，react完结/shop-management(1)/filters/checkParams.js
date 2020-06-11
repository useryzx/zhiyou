// checkParams

module.exports = function(paramArr){
    if(typeof paramArr == "string"){
        paramArr = [paramArr];
    }
    return function(req,res,next){
        const ppn = req.method.toLowerCase()=="post"?"body":"query";
        for(let i = 0;i<paramArr.length;i++){
            let p = paramArr[i];
            if(!req[ppn][p]){
                res.json({
                    err:10,
                    msg:`参数${p}缺失`
                });
                return ;
            }
        }
        next();
        
    }
}

