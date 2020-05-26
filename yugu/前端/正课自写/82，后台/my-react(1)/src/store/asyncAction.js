import {get,post} from "./http.js"

import {setUserInfo} from "./action.js"

// 登录请求
function queryLogin(params){
    return function(dispatch){
        return post("/user/login",params)
        .then(res=>{
            dispatch(setUserInfo(res.data.userInfo));
            return Promise.resolve(res);
        })
        
    }
}

// 判断是否登录请求
function queryIsLogin(params){
    return function(dispatch){
        return get("/user/islogin")
        .then(res=>{
            dispatch(setUserInfo(res.data.userInfo));
            return Promise.resolve(res);
        })
        
    }
}


export {
    queryLogin,
    queryIsLogin
}