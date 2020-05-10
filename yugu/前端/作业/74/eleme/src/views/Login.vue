<template>
    <div>
        <div id="box">
            <img src="@/assets/loginHeader.png">
        </div>
        <input class="inp" type="text" placeholder="手机号" v-model="tel">
        <button id="getCode" @click="queryValidateCode" :disabled="telInvalidate">获取验证码</button>
        <br><br>
        <input class="inp" type="text" placeholder="验证码" v-model="validate_code">
        <br><br>
        <div id="newUserTip">新用户登录即自动注册，并表示已同意<a href="#">
                《用户服务协议》和
                <a href="#">《隐私权政策》</a>
            </a></div>
        <button @click="loginClick" id="login">登录</button>
        <div id="aboutUs"><a href="#">关于我们</a></div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                tel: "",
                validate_code: "",
                validate_token: "",
                flag: true
            }
        },

        computed: {
            telInvalidate() {
                let reg = /^1\d{10}$/;
                return !reg.test(this.tel);
            }
        },

        methods: {
            queryValidateCode(e) {
                let num = 30
                if (this.flag) {
                    this.flag = !this.flag
                    let timer = setInterval(() => {
                        num--
                        e.target.textContent = num + '秒后重试'
                        if (num < 1) {
                            clearInterval(timer)
                            e.target.textContent = '获取验证码'
                            this.flag = true
                        }
                    }, 1000);
                    console.log("请求验证码");
                    this.http.post("/elepro/restapi/eus/login/mobile_send_code", {
                            captcha_hash: "",
                            captcha_value: "",
                            mobile: this.tel,
                            scf: "ms"
                        })
                        .then(res => {
                            console.log("获取验证");
                            console.log(res.data.validate_token);
                            this.validate_token = res.data.validate_token;
                            
                        })
                        .catch(err=>{
                            console.log("请求失败");
                        })
                }
            },
            loginClick() {
                this.http.post("/elepro/restapi/eus/login/login_by_mobile", {
                        mobile: this.tel,
                        scf: "ms",
                        validate_token: this.validate_token,
                        // validate_token: "42aaff24020594e5953d9304620fb0bdad5fce3cd3c89eade9e178a399c71524",
                        validate_code: this.validate_code
                    })
                    .then(res => {
                        if (res.data.user_id) {
                            localStorage.setItem("userId", res.data.user_id);
                            this.$router.push("/user");
                        } else {
                            alert("登录失败");
                            console.log(res.data);
                        }
                    })
            }
        },
    }

</script>


<style scoped>
    #box {
        width: 100%;
        height: 20%;
        text-align: center;
    }

    #box img {
        background-size: 100% 100%;
        width: 40%;
        height: 50%;
        margin-top: 40px;
    }

    .inp {
        width: 80%;
        margin-left: 10%;
        height: 40px;
        border-radius: 5px;
        border: solid 1px #ccc;
        text-indent: 1em;
    }

    .inp:focus {
        border: solid 1px rgb(0, 155, 255);
    }

    #getCode {
        position: absolute;
        top: 135px;
        right: 45px;
        background-color: white;
        border: none;
        color: #ccc;
        cursor: pointer;
    }

    #newUserTip {
        width: 80%;
        margin-left: 10%;
        color: #ccc;
        font-size: 14px;
    }

    #newUserTip a {
        color: rgb(0, 155, 255);
    }

    #login {
        background-color: rgb(76, 217, 111);
        color: white;
        border: none;
        width: 70%;
        margin-left: 15%;
        margin-top: 20px;
        height: 40px;
        border-radius: 5px;
        cursor: pointer;
    }

    #aboutUs {
        text-align: center;
        margin-top: 15px;
    }

    #aboutUs a {
        color: #ccc;
        font-size: 12px;
    }
</style>
