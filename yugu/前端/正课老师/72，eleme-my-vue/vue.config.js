module.exports = {
    devServer:{
        proxy:{
            "/elepro":{
                target:"https://h5.ele.me",
                changeOrigin:true,
                pathRewrite:{
                    "^/elepro":""
                },
                // cookie域限制重写，
                cookieDomainRewrite: ""
            },
            
        }
    }
}