<template>
    <div>
        <h1>Second页面</h1>
        <p>{{txt}}</p>

        <div>
            {{num}}
            <button @click="num++">+</button>
        </div>
    </div>
</template>


<script>
import axios from "axios";
export default {
    asyncData(){
        return axios.get("http://localhost:3000/api/test")
        .then(res=>{
            // return Promise.resolve({txt:res.data.msg});
            return {
                txt:res.data.msg,
                num:res.data.num
            };
        })
        .catch(err=>{
            console.log(err);
        })
    },
    data(){
        return {
            txt:"",
            num:null
        }
    },
    created() {
        // console.log(this.$axios);
        // this.$axios.get("/api/test")
        // .then(res=>{
        //     console.log(res.data);
        //     this.txt = res.data.msg;
        // })
        // .catch(err=>{
        //     console.log(err);
            
        // })
    },
    mounted() {
        
    },
}
</script>


<style scoped>
    
</style>