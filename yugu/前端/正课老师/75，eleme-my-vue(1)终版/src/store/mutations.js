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

    setRestList(state,v){
        state.restList = v;
    },
    addRestList(state,v){
        state.restList = state.restList.concat(v);
    },



    setMaskIndex(state,v){
        state.maskIndex = v;
    },

}