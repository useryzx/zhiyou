<template>
    <div id="box">
        <div>
            <router-link v-if="!isLogin" to="/user/login" id="userBox">
                <div id="userBox-frist">
                    <img src="@/assets/head.png">
                </div>
                <div id="userBox-second">
                    <div id="userBox-r">注册/登录</div>
                    <p id="userBox-p">
                        <img src="@/assets/手机.png">
                        <span>登录后享更多特权</span>
                    </p>
                </div>
                <div id="box-root-third">
                    <p>></p>
                </div>
            </router-link>


            <div v-else id="userBox">
                <div id="userBox-frist">
                    <img src="@/assets/head.png" style="background-color: rgb(252, gree214n, 230);">
                </div>
                <div id="userBox-second">
                    <div id="userBox-r">{{userInfo.username}}</div>
                    <p id="userBox-p">
                        <img src="@/assets/手机.png">
                        <span>{{userInfo.mobile|yinsi}}</span>
                    </p>
                </div>
                <div id="box-root-third">
                    <p>&gt;</p>
                </div>
            </div>

            <div id="activityItem">
                <div id="activityItem-redBag">
                    <img src="@/assets/红包.png">
                    <p>红包</p>
                </div>
                <div id="activityItem-goldCoin">
                    <img src="@/assets/金币.png">
                    <p>金币</p>
                </div>
            </div>

            <div class="holderSpace"></div>

            <div class="items">
                <div class="items-left">
                    <img src="@/assets/site.png">
                    <span class="items-spanF">我的地址</span>
                </div>
                <div class="items-right">
                    &gt;
                </div>
            </div>

            <div class="holderSpace"></div>

            <div class="items">
                <div class="items-left">
                    <img src="@/assets/商城.png" style="background-color: rgb(148, 217, 74);">
                    <span class="items-spanF">金币商城</span>
                </div>
                <div class="items-right">
                    &gt;
                </div>
            </div>

            <div class="items">
                <div class="items-left">
                    <img src="@/assets/礼物.png">
                    <span class="items-spanF">金币商城</span>
                </div>
                <div class="items-right">
                    &gt;
                </div>
            </div>

            <div class="holderSpace"></div>

            <div class="items">
                <div class="items-left">
                    <img src="@/assets/service.png">
                    <span class="items-spanF">我的客服</span>
                </div>
                <div class="items-right">
                    &gt;
                </div>
            </div>

            <div class="items">
                <div class="items-left">
                    <img src="@/assets/下载.png">
                    <span class="items-spanF">下载饿了吗APP</span>
                </div>
                <div class="items-right">
                    &gt;
                </div>
            </div>

            <div class="items">
                <div class="items-left">
                    <img src="@/assets/投入规则.png" style="background-color: rgb(0, 155, 255);">
                    <span class="items-spanF">规则中心</span>
                </div>
                <div class="items-right">
                    &gt;
                </div>
            </div>

            <div class="holderSpace"></div>

            <div class="policy">
                <a href="#">隐私政策</a>
            </div>
        </div>

    </div>
</template>


<script>
    import {
        mapActions,
        mapMutations,
        mapState
    } from "vuex";
    export default {
        data() {
            return {
                // isLogin: false,
                // userInfo: {}
            }
        },

        mounted() {

        },

        activated() {
            if (!localStorage.getItem("userId")) {
                // this.isLogin = false;
                this.setIsLogin(false);
            } else {
                this.queryIsLogin();
            }
        },
        computed: {
            ...mapState(["isLogin", "userInfo"])
        },

        methods: {
            ...mapActions(["queryIsLogin"]),
            ...mapMutations(["setIsLogin"])
        },
        filters: {
            yinsi(v) {
                console.log(v);
                return v = v.substr(0, 3) + '****' + v.substr(7);
            }
        }


    }
</script>


<style scoped>
    #box {
        width: 100vw;
        height: 100vh;
    }

    #userBox {
        width: 100%;
        height: 100px;
        background-color: rgb(0, 155, 255);
        display: block;
    }

    #userBox-frist {
        width: 30%;
        height: 100px;
        display: inline-block;
        padding-top: 5%;
        padding-left: 2%;

    }

    #userBox-frist img {
        width: 60%;
        height: 60%;
        background-size: 100% 100%;
        border-radius: 50%;
    }

    #userBox-second {
        width: 55%;
        display: inline-block;
    }

    #userBox-r {
        font-size: 22px;
        color: white;
        font-weight: bold;
    }

    #userBox-p {
        height: 15px;
        color: white;
        line-height: 15px;
        font-size: 12px;
        display: flex;
    }

    #userBox-p img {
        height: 15px;
    }

    #box-root-third {
        width: 10%;
        display: inline-block;
        color: white;
    }

    #box-root-third p {
        position: absolute;
        top: 20px;
        right: 20px;
    }

    #activityItem-redBag {
        width: 50%;
        text-align: center;
        display: inline-block;
        height: 80px;
        border-bottom: 1px #ccc solid;
        border-right: 1px #ccc solid;
        box-sizing: border-box;
    }

    #activityItem-redBag img {
        width: 30px;
        height: 30px;
        background-size: 100% 100%;
        border-radius: 50%;
        margin-top: 10px;
        background-color: rgb(242, 105, 95);
    }

    #activityItem-redBag p {
        margin-top: 2px;
        font-weight: bold;
    }

    #activityItem-goldCoin {
        width: 50%;
        text-align: center;
        display: inline-block;
        height: 80px;
        border-bottom: 1px #ccc solid;
        box-sizing: border-box;
    }

    #activityItem-goldCoin img {
        width: 30px;
        height: 30px;
        background-size: 100% 100%;
        border-radius: 50%;
        margin-top: 10px;
        background-color: rgb(106, 194, 11);
    }

    #activityItem-goldCoin p {
        margin-top: 2px;
        font-weight: bold;
    }

    .holderSpace {
        background-color: rgb(245, 245, 245);
        height: 15px;
    }

    .items {
        height: 40px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        cursor: pointer;
    }

    .items-left {
        height: 30px;
        line-height: 30px;
        display: flex;
    }

    .items-left img {
        height: 60%;
        margin: 5px;
    }

    .items-right {
        margin-right: 20px;
        color: #ccc;
    }

    .policy {
        width: 100%;
        text-align: center;
    }

    a {
        text-decoration: none;
        color: rgb(0, 155, 255);
    }
</style>