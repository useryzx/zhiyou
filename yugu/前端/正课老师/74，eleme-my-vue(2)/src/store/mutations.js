export default {
    setIsLogin(state,v){
        state.isLogin = v;
    },
    setUserInfo(state,v){
        state.userInfo = v;
    },
    setAddInfo(state,v){
        localStorage.setItem("addInfo",JSON.stringify(v));
        state.addInfo = v;
    },
}