
import axios from "axios";


export default {
    queryIsLogin(store){
        axios.get("/elepro/restapi/eus/v3/users/"+localStorage.getItem("userId"))
        .then(res=>{
            console.log(res);
            // this.isLogin = true;
            // this.userInfo = res.data;
            store.commit("setIsLogin",true);
            store.commit("setUserInfo",res.data);
            
        })
        .catch(err=>{
            // this.isLogin = false;
            store.commit("setIsLogin",false);
        })
    },

}