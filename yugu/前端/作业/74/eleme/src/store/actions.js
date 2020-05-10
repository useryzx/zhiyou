
import axios from "axios";
import { Toast } from 'vant';

const myRequest = {
    get(){
        Toast.loading({
            message: '加载中...',
            forbidClick: true
        });
        return axios.get(...arguments)
        .then(res=>{
            Toast.success('请求成功');
            return Promise.resolve(res);
        })
        .catch(err=>{
            Toast.fail('请求失败');
        });
    },

    post(){
        Toast.loading({
            message: '加载中...',
            forbidClick: true
        });
        return axios.post(...arguments)
        .then(res=>{
            Toast.success('请求成功');
            return Promise.resolve(res);
        })
        .catch(err=>{
            Toast.fail('请求失败');
        });
    }
}


export default {
    // 获取用户信息
    queryIsLogin(store){
        axios.get("/elepro/restapi/eus/v3/users/"+localStorage.getItem("userId"))
        .then(res=>{
            store.commit("setIsLogin",true);
            store.commit("setUserInfo",res.data);
            
        })
        .catch(err=>{
            // this.isLogin = false;
            store.commit("setIsLogin",false);
        })
    },

    // 根据地理坐标获取地址名称
    queryPositionNameByCoord(store,coord){
        myRequest.get("/elepro/restapi/bgs/poi/reverse_geo_coding",{
            params:coord
        })
        .then(res=>{
            let o = {
                lat:res.data.latitude,
                lng:res.data.longitude,
                name:res.data.name,
                geohash:res.data.geohash
            }
            store.commit("setAddInfo",o);

            return Promise.resolve(res);
        })
    },


}