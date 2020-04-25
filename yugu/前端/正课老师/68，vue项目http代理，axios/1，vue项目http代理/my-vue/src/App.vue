<template>
    <div>
        <!-- 在vue项目中，发送请求的代码都写在页面级组件中，请求返回的数据也存在页面级组件的data中，然后向下传值到子组件中进行显示。 -->
        
        <button @click="getClick">发起get请求</button>

        <button @click="postClick">发起post请求</button>
        
    </div>
</template>

<script>

import axios from "axios";
import qs from "qs";
import Vue from "vue";

if(!Vue.config.productionTip){
    axios.baseURL = "/proxy";
}


export default {
    mounted() {
        
    },

    methods: {
        getClick(){
            // axios是一款ajax请求工具，可以在浏览器和nodejs中使用。

            // axios.get，发送get请求，可以直接在url中拼接参数，也可以将参数写在请求配置对象的params字段中。
            axios.get("/api/get",{
                params:{age:20}
            })
            .then(res=>{
                // axios请求得到的res是整个相应报文，其中的data是响应数据>
                console.log(res.data);
            })
        },

        postClick(){
            // post请求可以将参数对象写在第二个参数的位置
            // ***axios发起的post请求，请求体默认是json格式的。
            // axios.post("/api/post",{
            //     age:99
            // })
            // .then(({data})=>{
            //     console.log(data);
            // })
            

            // 如果需要使用urlencoded格式的请求体，需要先把请求参数转为urlencoded格式的字符串。将字符串作为参数发送。
            let params = {age:99,name:"wang"};
            // "age=99&name=wang"
            params = qs.stringify(params);

            axios.post("/api/post",params)
            .then(({data})=>{
                console.log(data);
            });
        }
    },

}
</script>

<style>

</style>
