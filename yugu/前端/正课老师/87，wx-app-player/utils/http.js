function http(url,config){
    return new Promise(function(resolve,reject){
        wx.showLoading({
            title: '请稍等',
        });
        wx.request({
            url,
            ...config,
            header:{
                Cookie:wx.getStorageSync('cookie')
            },
            success(res){
                resolve(res);
            },
            fail(err){
                reject(err);
            },
            complete(r){
                // console.log(arguments);
                wx.hideLoading();
                if((r.statusCode+"").startsWith("2")){
                    wx.showToast({
                        title: "成功",
                    });
                }else{
                    wx.showToast({
                        title: "失败",
                        icon:"none"
                    });
                }
            }
        });
    });
}


export default http;