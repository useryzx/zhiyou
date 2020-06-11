
import {combineReducers} from "redux";

// 页面是否正在请求
function isLoading(state = false,action){
    if(action.type === "SET_IS_LOADING"){
        state = action.value;
    }
    return state;
}

// 用户信息
function userInfo(state = null,action){
    if(action.type === "SET_USER_INFO"){
        state = Object.assign({},state,action.value);
    }
    return state;
}

// 分类列表
function cateList(state=[],action){
    if(action.type === "SET_CATE_LIST" && action.value){
        
        state = action.value.slice();
    }
    return state;
}

// 商品列表
function goodList(state=[],action){
    if(action.type === "SET_GOOD_LIST" && action.value){
        state = action.value.slice();
    }
    return state;
}

// 用户列表
function userList(state=[],action){
    if(action.type === "SET_USER_LIST" && action.value){
        state = action.value.slice();
    }
    return state;
}

// 轮播图列表
function swiperList(state=[],action){
    if(action.type === "SET_SWIPER_LIST" && action.value){
        state = action.value.slice();
    }
    return state;
}

// 订单列表
function orderList(state=[],action){
    if(action.type === "SET_ORDER_LIST" && action.value){
        state = action.value.slice();
    }
    return state;
}


export default combineReducers({
    isLoading,
    userInfo,
    cateList,
    goodList,
    userList,
    swiperList,
    orderList
})