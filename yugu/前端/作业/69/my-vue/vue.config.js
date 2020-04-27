module.exports={
    devServer:{
        proxy:{
            "/gameRoom":{
                target:"http://open.douyucdn.cn",
                changeOrigin:true,
                pathRewrite:{
                    "^/gameRoom":"",
                }
            },
            
        }
    }
}