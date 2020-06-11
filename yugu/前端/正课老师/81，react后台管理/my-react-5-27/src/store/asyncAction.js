import {get,post} from "./http.js";

import {
    setUserInfo,
    setCateList
} from "./action.js";

import api from "./api.js";

// 登录请求
function queryLogin(params){
    return function(dispatch){
        return post(api.login,params)
        .then(res=>{
            dispatch(setUserInfo(res.data.userInfo));
            return Promise.resolve(res);
        })
    }
}

// 判断是否登录请求
function queryIsLogin(params){
    return function(dispatch){
        return get(api.isLogin)
        .then(res=>{
            if(!res.data.err){
                dispatch(setUserInfo(res.data.userInfo));
            }
            return Promise.resolve(res);
        })
        
    }
}

//--------------------------------------------------------------------------------

// 新增分类
function queryAddCate(params){
    return function(dispatch){
        return post(api.addCategory,params)
        .then(res=>{
            return Promise.resolve(res);
        })
    }
}

//分类列表
function queryCateList(params){
    return function(dispatch){
        return get(api.categoryList)
        .then(res=>{
            dispatch(setCateList(res.data.data));
            return Promise.resolve(res);
        })
        
    }
}

//修改分类
function queryEditCate(params){
    return function(dispatch){
        return post(api.editCategory,params)
        .then(res=>{
            return Promise.resolve(res);
        })
    }
}

//获取某个分类
function queryCategory(params){
    return function(dispatch){
        return get(api.getCategory,params)
        .then(res=>{
            // dispatch(setCateList(res.data.data));
            return Promise.resolve(res);
        })
        
    }
}

export {
    queryLogin,
    queryIsLogin,
    queryAddCate,
    queryCateList,
    queryEditCate,
    queryCategory
}