
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
            // console.log(res);
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

    // 请求商家列表
    queryRestList(store){
        // return myRequest.get("/elepro/restapi/shopping/v3/restaurants",{
        return myRequest.get("/restList.json",{
            params:{
                latitude:store.state.addInfo.lat,
                longitude:store.state.addInfo.lng,
                offset:store.state.restList.length,
                limit:8,
                extras:["activities","tags"],
                extra_filters:"home",
                rank_id:"",
                terminal:"h5"
            }
        })
        .then(res=>{
            console.log(res);
            store.commit("addRestList",res.data.items);
            return Promise.resolve();
        });
    }

}