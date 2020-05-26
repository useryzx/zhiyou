import axios from "axios";
import store from "./store.js";

import {setIsLoading} from "./action.js";
import { message } from 'antd';

function get(url,params){
    // 开启加载指示器
    store.dispatch(setIsLoading(true));
    return axios.get(url,{
        params
    })
    .then(res=>{
        store.dispatch(setIsLoading(false));
        if(res.data.err){
            message.error(res.data.msg);
        }else{
            message.success(res.data.msg);
        }
        return Promise.resolve(res);
    })
    .catch(err=>{
        store.dispatch(setIsLoading(false));
        message.error("网络故障");
    })
}


function post(url,params,config){
    store.dispatch(setIsLoading(true));
    return axios.post(url,params,config)
    .then(res=>{
        store.dispatch(setIsLoading(false));
        if(res.data.err){
            message.error(res.data.msg);
        }else{
            message.success(res.data.msg);
        }
        return Promise.resolve(res);
    })
    .catch(err=>{
        store.dispatch(setIsLoading(false));
        message.error("网络故障");
        return Promise.reject(err);
    })
}

export {
    get,
    post
}