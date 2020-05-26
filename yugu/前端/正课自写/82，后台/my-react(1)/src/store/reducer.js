
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



export default combineReducers({
    isLoading,
    userInfo
})