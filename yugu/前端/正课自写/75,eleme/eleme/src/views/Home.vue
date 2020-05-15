<template>
    <div id="box" @scroll="onResScroll">
        <div id="navbar">
            <router-link to="/home/address" id="navbar-first">
                <img id="navbar-f-img" src="@/assets/定位.png">
                <span v-if="addState==0" id="navbar-f-p">正在获取您的位置</span>
                <span v-if="addState==1" id="navbar-f-p">请选择您的位置</span>
                <span v-if="addState==2" id="navbar-f-p">{{addInfo.name}}</span>
            </router-link>
        </div>
        <div id="navbar-search">
            <div id="navbar-search-box">
                <img src="@/assets/搜索.png" id="navbar-search-img">
                <span id="navbar-search-holder">搜索饿了吗商家、商品名称</span>
            </div>

        </div>
        <!-- 没有地址 -->
        <div v-if="addState==1 || addState==0">
            <div id="noAddr">
                <img src="https://fuss10.elemecdn.com/2/67/64f199059800f254c47e16495442bgif.gif" alt="">
            </div>
            <br>
            <br>
            <div id="holder-text">输入地址后才能订餐哦！</div>
        </div>

        <!-- 地址存在 -->
        <div v-if="addState==2">
            <div id="showItemBox">
                <div id="entry-box">
                    <div v-for="(e,i) in entryList" :key="i" id="entry-box-div">
                        <img :src="imgFilter(e.image_hash)">
                        <p>{{e.name}}</p>
                    </div>
                </div>
                <!-- flag 品质套餐-->
                <div id="flag">
                    <h3 id="flag-h3">品质套餐</h3>
                    <p id="flag-p">搭配齐全吃得好</p>
                    <span id="flag-span">立即抢购 &gt;</span>
                    <img src="https://cube.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png?x-oss-process=image/format,webp/resize,w_282,h_188,m_fixed"
                        alt="" id="flag-img">
                </div>

                <!-- 超级会员广告 -->
                <div id="superVip">
                    <img src="https://cube.elemecdn.com/8/0e/4dd212d831becab6e3ebd484c0941jpeg.jpeg?x-oss-process=image/format,webp/resize,w_34"
                        alt="" id="superVip-img">
                    <span id="superVip-title">超级会员</span>
                    <span id="superVip-detail"> • 每月领20元红包</span>
                    <span id="superVip-open">立即开通&gt;</span>
                </div>

            </div>
            <!-- 推荐商家 -->
            <div id="res-title">
                <span id="res-title-span-before"></span>
                <span id="res-title-span">推荐商家</span>
                <span id="res-title-span-after"></span>
            </div>
            <!-- 排序参数
            // 综合排序不传，好评优先7，起送价最低1，配送最快2，配送费最低9，人均从低到高10，人均从高到低11，通用排序12，距离最近5，销量最高6 -->
            <div id="res-filter" @click="conditionClick">
                <div>
                    <span>综合排序</span>
                </div>
                <div>
                    <span order="5">距离最近</span>
                </div>
                <div>
                    <span order="6">销量最高</span>
                </div>
                <div>
                    <span>筛选</span>
                </div>
            </div>

            <div id="restaurantBox">
                <div v-for="(v, index) in restaurantList" :key="index">
                    <restaurant :restaurant="v.restaurant"></restaurant>
                </div>
            </div>
        </div>
        <div v-if="!isLogin" class="placeholder">
            <img src="//fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" alt="">
            <h3>没有结果</h3>
            <p>登录后查看更多商家</p>
            <router-link to="/user/login">
                <span>登录</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapMutations,
        mapState
    } from "vuex";
    import imgFilter from "@/util/imgFilter.js";
    import restaurant from "@/components/Restaurant.vue";


    // 假数据
    import restaurantData from '@/data/data.js'
    export default {

        data() {
            return {
                // 0正在获取，1获取失败，2获取成功
                addState: 0,
                entryList: [],
                // restaurantList: [],
                // 弄个假数据
                restaurantList:restaurantData.restaurantList,
                isLoading: false,
                order: null,
                lastOrder: null,
            }
        },
        activated() {
            if (!localStorage.getItem("userId")) {
                this.setIsLogin(false);
            } else {
                this.queryIsLogin().then(() => {
                    // 登录的时候访问饭店列表
                    if (this.isLogin) {
                        // this.resList()
                    }
                })
            }
            this.queryEntryList();

        },
        mounted() {
            this.getPosition();
        },
        computed: {
            ...mapState(["isLogin", "userInfo", "addInfo"])
        },

        methods: {
            ...mapActions(["queryIsLogin", "queryPositionNameByCoord", ]),
            ...mapMutations(["setIsLogin", "setAddInfo"]),

            // 分类图片处理方法
            imgFilter,
            // 获取地理位置
            getPosition() {
                let addInfo = JSON.parse(localStorage.getItem("addInfo"));
                // console.log(addInfo);
                if (addInfo) {
                    this.setAddInfo(addInfo);
                    this.addState = 2;
                } else {
                    navigator.geolocation.getCurrentPosition(pos => {
                        let lat = pos.coords.latitude;
                        let lng = pos.coords.longitude;
                        this.queryPositionNameByCoord({
                                latitude: lat,
                                longitude: lng
                            })
                            .then(res => {
                                this.addState = 2;
                            })
                    }, err => {
                        console.log(err);
                        this.addState = 1;
                        this.$router.push("/home/address");
                    }, {
                        timeout: 5000
                    });
                }
            },



            // 请求分类列表
            queryEntryList() {
                this.http.get("/elepro/restapi/shopping/v2/entries", {
                        params: {
                            latitude: this.addInfo.lat,
                            longitude: this.addInfo.lng,
                            terminal: "h5",
                            templates: ["main_template", "favourable_template", "svip_template"]
                        }
                    })
                    .then(res => {
                        this.entryList = res.data[1].entries;
                    })
            },


            // 获取店铺列表
            resList() {
                console.log("开始请求店铺列表");
                console.log("order_by" + this.order);

                // 请求中的标识
                this.isLoading = true;
                // 访问过快会出问题
                this.http.get("/elepro/restapi/shopping/v3/restaurants", {
                        params: {
                            latitude: this.addInfo.lat,
                            longitude: this.addInfo.lng,
                            offset: this.restaurantList.length,
                            limit: "8",
                            extras: ['activities', 'tags'],
                            extra_filters: 'home',
                            order_by: this.order,
                            rank_id: "",
                            terminal: "h5",
                        }
                    })
                    .then(res => {
                        console.log("请求餐厅数据成功");
                        console.log(res.data.items);
                        // 第一次访问接口时调用
                        // 此次访问时的访问排序和上次不同可当做切换了访问方式，列表需要覆盖
                        if (this.order != this.lastOrder) {
                            this.restaurantList = res.data.items;
                        } else {
                            this.restaurantList = this.restaurantList.concat(res.data.items);
                        }
                        this.isLoading = false;
                        // 记录此次请求的条件
                        this.lastOrder = this.order;

                    })
                    .catch(err => {
                        console.log("请求餐厅数据出错了");
                        console.log(err);
                        this.isLoading = false;
                        // 记录此次请求的条件
                        this.lastOrder = this.order;
                    })
            },
            // 滚动加载
            onResScroll(e) {
                let st = e.target.scrollTop;
                let sh = e.target.scrollHeight;
                let ch = e.target.clientHeight;
                if (st >= sh - ch - 50) {
                    if (!this.isLoading && this.isLogin) {
                        this.resList();
                    }
                }
            },
            // 条件搜索
            conditionClick(e) {
                this.order = e.target.getAttribute("order");
                if (this.isLogin) {
                    this.resList();
                }
            }
        },
        filters: {
            km(v) {
                if (v > 1000) {
                    return (v / 1000).toFixed(2) + 'km'
                } else {
                    return v + 'm'
                }
            }
        },
        components: {
            restaurant,
        }
    }
</script>


<style scoped>
    #box {
        height: 100vh;
        font-size: 0;
    }

    /* 地址位置样式 */
    #navbar {
        width: 100%;
        height: 50px;
        background-color: rgb(0, 169, 255);
        position: relative;
    }

    #navbar-first {
        position: absolute;
        left: 15px;
        top: 10px;
        display: flex;
    }

    #navbar-f-img {
        width: 20px;
        height: 20px;
        background-size: 100% 100%;
    }

    #navbar-f-p {
        color: white;
    }

    /* 搜索样式 */
    #navbar-search {
        /* 粘性定位 */
        position: sticky;
        /* 触发粘性定位 */
        top: 0;
        height: 60px;
        background-color: rgb(0, 169, 255);
        padding: 10px 20px 0 20px;
        color: #ccc;
        box-sizing: border-box;
        z-index: 5;
    }

    #navbar-search-box {
        display: flex;
        background-color: #fff;
        line-height: 40px;
        align-items: center;
        justify-content: center;
    }

    #navbar-search-img {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }

    /* 没有获取地址时样式 */
    #noAddr {
        width: 100%;
        height: 200px;
        margin-top: 50px;
    }

    #noAddr img {
        width: 60%;
        background-size: 100% 100%;
        margin-left: 20%;
    }

    #holder-text {
        width: 100%;
        text-align: center;
        color: #666666;
    }

    /* navbar以下部分 */
    #showItemBox {
        padding: 0 3vw;
    }


    /* 分类列表 */
    #entry-box {
        width: 100%;
        /* display: flex; */
    }

    #entry-box-div {
        width: 20%;
        box-sizing: border-box;
        display: inline-block;
        text-align: center;
    }

    #entry-box-div img {
        width: 60%;
        background-size: 100% 100%;
    }

    #entry-box-div p {
        margin: 0;
        color: #666666;
        font-size: 1vw;
    }

    /* 品质套餐 */
    #flag {
        position: relative;
        margin-top: 2.5vh;
        /* border: 1px saddlebrown solid; */
        height: 12vh;
        background-color: rgb(247, 247, 247);
        padding: 3vw;
        border-radius: 2px;
    }

    #flag-h3 {
        margin: 0;
    }

    #flag-p {
        margin: 1vh 0 0 0;
        color: rgb(141, 141, 141);
        font-size: 1vw;
    }

    #flag-span {
        display: inline-block;
        margin-top: 1.2vh;
        color: rgb(175, 130, 96);
        font-size: 1vw;
        font-weight: bold;
    }

    #flag-img {
        position: absolute;
        width: 35vw;
        right: 3vw;
        top: 2vh;
    }



    /* vip广告 */
    #superVip {
        color: #644f1b;
        position: relative;
        height: 5vh;
        border-radius: 4px;
        margin-top: .5vh;
        background-image: linear-gradient(90deg, #ffefc4, #f3dda0);
        line-height: 5vh;
    }

    #superVip-img {
        width: 4vw;
        height: 4vw;
        vertical-align: baseline;
        margin: 0 1vw;
    }

    #superVip-title {
        font-size: 2vw;
        font-weight: bold;
    }

    #superVip-detail {
        font-size: 1vw;
    }

    #superVip-open {
        font-size: 12px;
        display: inline-block;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    /* 推荐商家 */
    #res-title {
        height: 5vh;
        margin-top: 1vh;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
    }

    #res-title-span {
        font-size: 4.5vw;
    }

    #res-title-span-before,
    #res-title-span-after {
        display: block;
        width: 6vw;
        height: 1px;
        background-color: #999;
    }

    #res-title-span-before {
        margin-right: 15px;
    }

    #res-title-span-after {
        margin-left: 15px;
    }

    /* 排序导航 */
    #res-filter {
        position: sticky;
        top: 60px;
        z-index: 5;
        height: 6vh;
        display: flex;
        align-items: center;
        justify-content: space-around;
        /* border: solid 1px red; */
        box-sizing: border-box;
        background-color: #fff;
    }

    #res-filter span {
        font-size: 3.5vw;
        color: #666;
    }

    .placeholder {
        text-align: center;
    }

    .placeholder img {
        width: 58vw;
    }

    .placeholder h3 {
        font-size: 4vw;
        margin: 1vh 0;
        font-weight: normal;
    }

    .placeholder p {
        color: #666;
        margin: 0;
        font-size: 2vw;
    }

    .placeholder span {
        display: inline-block;
        background-color: rgb(86, 209, 118);
        padding: 1.6vh 13vw;
        margin-top: 1vh;
        font-size: 4vw;
        color: white;
        border-radius: 2px;
        margin-bottom: 2vh;
    }
</style>