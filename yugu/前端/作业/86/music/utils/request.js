import api from './api.js'
// 封装微信请求
function fetch(obj) {
  wx.showLoading({
    title: '正在请求',
  })
  let o = {
    ...obj
  }
  // 对请求参数封装，让其支持成功失败的回调解决传参限制问题
  o.success = function (res) {
    wx.hideLoading();
    console.log(res);
    
    obj.success(res)
  }
  o.fail = function (err) {
    wx.hideLoading();
    obj.fail(err)
  }
  wx.request(o);
}

function login(data) {
  return new Promise(function (resolve, reject) {
    fetch({
      url: api.login,
      data,
      success: (res) => {
        // 微信小程序不支持cookie，所以必须手动保存和发送cookie
        wx.setStorageSync("loginCookie", res.header["Set-Cookie"]);
        wx.setStorageSync("uid", res.data.account.id);
        let csrf = null;
        for (let i = 0; i < res.cookies.length; i++) {
          let c = res.cookies[i];
          if (c.indexOf("__csrf") >= 0) {
            let ca = c.split(";")[0];
            csrf = ca.split("=")[1];
            break;
          }
        }
        wx.setStorageSync("csrf", csrf);
        resolve(res)
      },
      fail: (err) => {
        console.log(err);
        reject(err)
      }
    })
  })
}
export {
  login
}