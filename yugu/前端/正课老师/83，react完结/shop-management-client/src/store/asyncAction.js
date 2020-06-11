import {get,post} from "./http.js";

import {
    setUserInfo,
    setCateList,
    setGoodList,
    setUserList,
    setSwiperList,
    setOrderList
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

// 上传单个文件
function uploadOne(params,config){
    return function(dispatch){
        return post(api.uploadOne,params,{
            "Content-Type":"multipart/form-data"
        })
        .then(res=>{
            return Promise.resolve(res);
        })
    }
}


//上传多个文件
function uploadMany(params,config){
    return function(dispatch){
        return post(api.uploadMany,params,{
            "Content-Type":"multipart/form-data"
        })
        .then(res=>{
            return Promise.resolve(res);
        })
    }
}

// 新增商品请求
function queryAddGood(params){
    return function(dispatch){
        return post(api.addGood,params)
        .then(res=>{
            return Promise.resolve(res);
        })
    }
}

// 商品查询
function queryGoodList(params){
    return function(dispatch){
        return post(api.goodList,params)
        .then(res=>{
            dispatch(setGoodList(res.data.data));
            return Promise.resolve(res);
        })
    }
}

// 修改商品
function queryEditGood(params){
    return function(dispatch){
        return post(api.editGood,params)
        .then(res=>{
            return Promise.resolve(res);
        })
    }
}

// 添加管理员
function queryAddAdmin(params){
    return function(dispatch){
        return post(api.addAdmin,params)
        .then(res=>{
            return Promise.resolve(res);
        })
    }
}

//添加普通用户
function queryAddUser(params){
    return function(dispatch){
        return post(api.addUser,params)
        .then(res=>{
            return Promise.resolve(res);
        })
    }
}

//退出登录
function queryLogout(params){
    return function(dispatch){
        return get(api.logout)
        .then(res=>{
            return Promise.resolve(res);
        })
    }
}

// 用户列表
function queryUserList(params){
    return function(dispatch){
        return get(api.userList)
        .then(res=>{
            dispatch(setUserList(res.data.data));
            return Promise.resolve(res);
        })
    }
}

// 修改密码
function querychangePass(params){
    return function(dispatch){
        return post(api.changePassword,params)
        .then(res=>{
            return Promise.resolve(res);
        })
    }
}

//添加轮播页
function queryAddSwiper(params){
    return function(dispatch){
        return post(api.addSwiper,params)
        .then(res=>{
            return Promise.resolve(res);
        })
    }
}

// 轮播图列表
function querySwiperList(params){
    return function(dispatch){
        return get(api.swiperList)
        .then(res=>{
            dispatch(setSwiperList(res.data.data));
            return Promise.resolve(res);
        })
    }
}

// 删除轮播图

function queryDeleteSwiper(params){
    return function(dispatch){
        return post(api.deleteSwiper,params)
        .then(res=>{
            return Promise.resolve(res);
        })
    }
}

// 订单列表
function queryOrderList(params){
    return function(dispatch){
        return post(api.orderList,params)
        .then(res=>{
            dispatch(setOrderList(res.data.data));
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
    queryCategory,
    uploadOne,
    uploadMany,
    queryAddGood,
    queryGoodList,
    queryEditGood,
    queryAddAdmin,
    queryAddUser,
    queryLogout,
    queryUserList,
    querychangePass,
    queryAddSwiper,
    querySwiperList,
    queryDeleteSwiper,
    queryOrderList
}