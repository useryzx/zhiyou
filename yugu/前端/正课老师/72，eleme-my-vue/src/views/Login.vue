<template>
    <div>
        <label for="">手机号</label>
        <input type="text" v-model="tel">
        <br>
        <button @click="queryValidateCode" :disabled="telInvalidate">获取验证码</button>
        <br>
        <input type="text" placeholder="验证码" v-model="validate_code">


        <br>
        <br>
        <button @click="loginClick">登录</button>
    </div>
</template>


<script>
export default {
    data() {
        return {
            tel:"",
            validate_code:"",
            validate_token:""
        }
    },

    computed: {
        telInvalidate(){
            let reg = /^13\d{9}$/;
            // console.log(!reg.test(this.tel))
            return !reg.test(this.tel);
        }
    },

    methods: {
        queryValidateCode(){
            
            this.http.post("/elepro/restapi/eus/login/mobile_send_code",{
                captcha_hash:"",
                captcha_value:"",
                mobile:this.tel,
                scf:"ms"
            })
            .then(res=>{
                this.validate_token = res.data.validate_token;
            })
            
        },
        loginClick(){


            this.http.post("/elepro/restapi/eus/login/login_by_mobile",{
                mobile:this.tel,
                scf:"ms",
                // 如果出现滑块，则使用官方页面获取短信验证码，并把请求中的validate_token粘贴过来
                // validate_token:"b4da7ee70ad04d4a8270b0bf6c9af571441ad1b15d4f5abd483bc8a19113e55f",
                validate_token:this.validate_token,
                validate_code:this.validate_code
            })
            .then(res=>{
                if(res.data.user_id){
                    localStorage.setItem("userId",res.data.user_id);
                    this.$router.push("/user");
                }else{
                    alert("登录失败");
                    console.log(res.data);
                }
            })
        }
    },
}

window.open("tel://13613800129");


</script>


<style scoped>
    
</style>

<!-- 1，填写手机号之后，调用获取验证码接口，参数需要发送手机号（如果有验证码也需要发送验证码），请求成功之后手机会受到短信，请求响应会返回validate_token -->

<!-- 2，得到手机验证码validate_code和请求响应的validate_token之后，使用这两个参数调用登录接口 -->