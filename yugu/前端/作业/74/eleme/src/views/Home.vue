<template>
    <div id="box">
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

            <div @scroll="onResScroll" id="restaurantBox">
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
    export default {

        data() {
            return {
                // 0正在获取，1获取失败，2获取成功
                addState: 0,
                entryList: [],
                // restaurantList: [],
                restaurantList: [{
                        "restaurant": {
                            "act_tag": 0,
                            "activities": [{
                                    "attribute": "{18:{\"content\":\"5\",\"type\":1},35:{\"content\":\"12\",\"type\":1},55:{\"content\":\"18\",\"type\":1},85:{\"content\":\"28\",\"type\":1}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "满18元减5元，满35元减12元，满55元减18元，满85元减28元",
                                    "icon_color": "f07373",
                                    "icon_name": "减",
                                    "id": 22991290306,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "满减优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "满18元减5元，满35元减12元，满55元减18元，满85元减28元",
                                    "type": 102
                                },
                                {
                                    "attribute": "{0:{\"content\":\"2.0\",\"type\":7}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "配送费立减2元",
                                    "icon_color": "70bc46",
                                    "icon_name": "配",
                                    "id": 23011223674,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "配送费优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "配送费立减2元",
                                    "type": 901
                                },
                                {
                                    "attribute": "{0:{\"content\":\"0.61\",\"type\":2}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "折扣商品61折起",
                                    "icon_color": "3cc791",
                                    "icon_name": "折",
                                    "id": 22990891498,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "折扣优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "折扣商品61折起",
                                    "type": 501
                                },
                                {
                                    "attribute": "{0:{\"content\":\"14\",\"type\":4}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "特价商品14元起",
                                    "icon_color": "f1884f",
                                    "icon_name": "特",
                                    "id": 23011180618,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "特价商品",
                                    "text_color": "#FF4B33",
                                    "tips": "特价商品14元起",
                                    "type": 502
                                }
                            ],
                            "address": null,
                            "authentic_id": 337163065,
                            "average_cost": null,
                            "baidu_id": null,
                            "bidding": null,
                            "brand_id": 6985,
                            "business_info": "{\"pickup_scheme\":\"https://h5.ele.me/shop/#id=E9829631674663608953\",\"ad_info\":{\"isAd\":\"false\"},\"recent_order_num_display\":\"月售13\"}",
                            "closing_count_down": 6971,
                            "delivery_fee_discount": 2.0,
                            "delivery_mode": {
                                "border": "",
                                "color": "2395FF",
                                "gradient": {
                                    "rgb_from": "00a6ff",
                                    "rgb_to": "00a6ff"
                                },
                                "icon_hash": "b9b45d2f6ff0dbeef3a78ef0e4e90abapng",
                                "id": 1,
                                "is_solid": true,
                                "text": "蜂鸟专送",
                                "text_color": "FFFFFF"
                            },
                            "description": "",
                            "distance": 523,
                            "favor_time": null,
                            "favored": false,
                            "flavors": [{
                                "id": 234,
                                "name": "炸鸡炸串"
                            }],
                            "float_delivery_fee": 3.1,
                            "float_minimum_order_amount": 20.0,
                            "folding_restaurant_brand": "正新鸡排",
                            "folding_restaurants": [{
                                "distance": 720,
                                "id": "E9610601730809733761",
                                "name": "正新鸡排(新垵店)",
                                "order_lead_time": 30,
                                "scheme": "https://h5.ele.me/shop/#id=E9610601730809733761?o2o_extra_param=%7B%22rank_id%22%3A%22b65750a9f4f84abebe30370a504a75a8%22%7D",
                                "type": 0
                            }],
                            "has_story": false,
                            "id": "E9829631674663608953",
                            "image_path": "1C55EE92B4D347F2BA5B9F5B428CCE5Djpeg",
                            "is_new": true,
                            "is_premium": false,
                            "is_star": false,
                            "is_stock_empty": 0,
                            "is_valid": 1,
                            "latitude": 24.524445,
                            "longitude": 117.999284,
                            "max_applied_quantity_per_order": -1,
                            "name": "正新鸡排(老富海店)",
                            "next_business_time": "明天 10:35",
                            "only_use_poi": null,
                            "opening_hours": [
                                "10:35/23:30"
                            ],
                            "order_lead_time": 30,
                            "out_of_range": false,
                            "phone": null,
                            "piecewise_agent_fee": {
                                "description": "夜间配送¥3.1",
                                "extra_fee": 2.1,
                                "is_extra": true,
                                "no_subsidy_fee": "¥5.1",
                                "rules": [{
                                    "fee": 3.1,
                                    "price": 20.0
                                }],
                                "tips": "夜间配送¥3.1"
                            },
                            "platform": 0,
                            "posters": [

                            ],
                            "promotion_info": "温馨提示：产品现做，请耐心等待，谢谢您的支持",
                            "rating": 5.0,
                            "rating_count": 4,
                            "recent_order_num": 13,
                            "recommend": {
                                "image_hash": "731111f3f9379e772eedf4855beae8a1jpeg",
                                "is_ad": false,
                                "track": "{\"rankType\":\"50\",\"trafficCardId\":\"0\"}"
                            },
                            "recommend_reasons": [{
                                "name": "配送飞快"
                            }],
                            "regular_customer_count": 0,
                            "restaurant_info": null,
                            "scheme": "https://h5.ele.me/shop/#id=E9829631674663608953?o2o_extra_param=%7B%22rank_id%22%3A%22b65750a9f4f84abebe30370a504a75a8%22%7D",
                            "status": 1,
                            "support_tags": [{
                                "border": "dddddd",
                                "color": "666666",
                                "icon": "4e20966ca2a516de3f02fb9c7fd1bc6dpng",
                                "text": "炸鸡炸串",
                                "type": 1
                            }],
                            "supports": [{
                                "border": "dddddd",
                                "description": "该商户食品安全已由国泰产险承担，食品安全有保障",
                                "icon_color": "666666",
                                "icon_name": "保",
                                "id": 7,
                                "name": "食无忧",
                                "text_color": "666666",
                                "two_characters_icon_name": "保险"
                            }],
                            "target_tag_path": "2ee2741ca9ac548f5efce60c645668cbpng",
                            "theme": {
                                "default_color": "2395ff",
                                "header_style": 3,
                                "hongbao_style": 0,
                                "logo_sub": null,
                                "price_color": "ff5339",
                                "third_tab_name": "商家",
                                "vanish_fields": [

                                ]
                            },
                            "type": 0
                        }
                    },
                    {
                        "restaurant": {
                            "act_tag": 0,
                            "activities": [{
                                    "attribute": "{40:{\"content\":\"25\",\"type\":1},75:{\"content\":\"36\",\"type\":1},100:{\"content\":\"50\",\"type\":1},150:{\"content\":\"60\",\"type\":1}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "满40元减25元，满75元减36元，满100元减50元，满150元减60元",
                                    "icon_color": "f07373",
                                    "icon_name": "减",
                                    "id": 22817921419,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "满减优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "满40元减25元，满75元减36元，满100元减50元，满150元减60元",
                                    "type": 102
                                },
                                {
                                    "attribute": "{0:{\"content\":\"1.1\",\"type\":7}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "配送费立减1.1元",
                                    "icon_color": "70bc46",
                                    "icon_name": "配",
                                    "id": 22009221395,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "配送费优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "配送费立减1.1元",
                                    "type": 901
                                },
                                {
                                    "attribute": "15",
                                    "background": {
                                        "rgb_from": "#FF4B33",
                                        "rgb_to": "#FF4B33"
                                    },
                                    "border": "#FF4B33",
                                    "description": "饿了么新用户首单立减15元",
                                    "icon_color": "70bc46",
                                    "icon_name": "新",
                                    "id": 22980380442,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "新用户立减",
                                    "text_color": "#FFFFFF",
                                    "tips": "饿了么新用户首单立减15元",
                                    "type": 103
                                },
                                {
                                    "attribute": "{0:{\"content\":\"0\",\"type\":4}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "特价商品0元起",
                                    "icon_color": "f1884f",
                                    "icon_name": "特",
                                    "id": 23019280027,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "特价商品",
                                    "text_color": "#FF4B33",
                                    "tips": "特价商品0元起",
                                    "type": 502
                                }
                            ],
                            "address": null,
                            "authentic_id": 167991501,
                            "average_cost": null,
                            "baidu_id": null,
                            "bidding": null,
                            "brand_id": 554389,
                            "business_info": "{\"pickup_scheme\":\"https://h5.ele.me/shop/#id=E13066277260941392124\",\"ad_info\":{\"isAd\":\"false\"},\"recent_order_num_display\":\"月售727\"}",
                            "closing_count_down": 15971,
                            "delivery_fee_discount": 1.1,
                            "delivery_mode": null,
                            "description": "",
                            "distance": 453,
                            "favor_time": null,
                            "favored": false,
                            "flavors": [{
                                    "id": 236,
                                    "name": "小龙虾"
                                },
                                {
                                    "id": 221,
                                    "name": "川湘菜"
                                }
                            ],
                            "float_delivery_fee": 3.9,
                            "float_minimum_order_amount": 0.0,
                            "folding_restaurant_brand": "虾点外卖",
                            "folding_restaurants": [{
                                "distance": 8511,
                                "id": "E17660892242543806096",
                                "name": "虾点(杏林店)",
                                "order_lead_time": 65,
                                "scheme": "https://h5.ele.me/shop/#id=E17660892242543806096?o2o_extra_param=%7B%22rank_id%22%3A%22b65750a9f4f84abebe30370a504a75a8%22%7D",
                                "type": 0
                            }],
                            "has_story": false,
                            "id": "E13066277260941392124",
                            "image_path": "cae0778082f857b585c217d1b64a3280png",
                            "is_new": false,
                            "is_premium": true,
                            "is_star": false,
                            "is_stock_empty": 0,
                            "is_valid": 1,
                            "latitude": 24.526446,
                            "longitude": 117.994375,
                            "max_applied_quantity_per_order": -1,
                            "name": "虾点(新阳店)",
                            "next_business_time": "明天 16:30",
                            "only_use_poi": null,
                            "opening_hours": [
                                "16:30/2:00"
                            ],
                            "order_lead_time": 32,
                            "out_of_range": false,
                            "phone": null,
                            "piecewise_agent_fee": {
                                "description": "配送¥3.9",
                                "extra_fee": 0.0,
                                "is_extra": false,
                                "no_subsidy_fee": "¥5",
                                "rules": [{
                                    "fee": 3.9,
                                    "price": 0.0
                                }],
                                "tips": "配送¥3.9"
                            },
                            "platform": 0,
                            "posters": [

                            ],
                            "promotion_info": "致亲爱的虾粉：\n1、恶劣天气，门店订单较多同时配送的骑手减少，因此订单配送会延迟，希望虾粉们理解。\n2、如有产品质量问题或者配送问题，虾粉们可致电门店店长，门店店长一定会给您一个满意的答复。",
                            "rating": 4.5,
                            "rating_count": 1790,
                            "recent_order_num": 727,
                            "recommend": {
                                "is_ad": false,
                                "reason": ""
                            },
                            "recommend_reasons": [{
                                "name": "配送飞快"
                            }],
                            "regular_customer_count": 0,
                            "restaurant_info": null,
                            "scheme": "https://h5.ele.me/shop/#id=E13066277260941392124?o2o_extra_param=%7B%22rank_id%22%3A%22b65750a9f4f84abebe30370a504a75a8%22%7D",
                            "status": 1,
                            "support_tags": [{
                                "border": "dddddd",
                                "color": "666666",
                                "icon": "4e20966ca2a516de3f02fb9c7fd1bc6dpng",
                                "text": "小龙虾",
                                "type": 1
                            }],
                            "supports": [{
                                "border": "dddddd",
                                "description": "该商家支持开发票，请在下单时填写好发票抬头",
                                "icon_color": "666666",
                                "icon_name": "票",
                                "id": 4,
                                "name": "开发票",
                                "text_color": "666666",
                                "two_characters_icon_name": "发票"
                            }],
                            "target_tag_path": "d53fc0cb4dc67973038cbc591938a1b6png",
                            "theme": {
                                "default_color": "",
                                "header_style": 3,
                                "hongbao_style": 0,
                                "logo_sub": "e3af66907485b2244532b8166bb648b2png",
                                "price_color": "ff5339",
                                "third_tab_name": "商家",
                                "vanish_fields": [

                                ]
                            },
                            "type": 0
                        }
                    },
                    {
                        "restaurant": {
                            "act_tag": 0,
                            "activities": [{
                                    "attribute": "{20:{\"content\":\"20\",\"type\":1},30:{\"content\":\"24\",\"type\":1},60:{\"content\":\"48\",\"type\":1},118:{\"content\":\"68\",\"type\":1}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "满20元减20元，满30元减24元，满60元减48元，满118元减68元",
                                    "icon_color": "f07373",
                                    "icon_name": "减",
                                    "id": 22112594650,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "满减优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "满20元减20元，满30元减24元，满60元减48元，满118元减68元",
                                    "type": 102
                                },
                                {
                                    "attribute": "{0:{\"content\":\"6.6\",\"type\":7}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "配送费立减6.6元",
                                    "icon_color": "70bc46",
                                    "icon_name": "配",
                                    "id": 22956292946,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "配送费优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "配送费立减6.6元",
                                    "type": 901
                                },
                                {
                                    "attribute": "9",
                                    "background": {
                                        "rgb_from": "#FF4B33",
                                        "rgb_to": "#FF4B33"
                                    },
                                    "border": "#FF4B33",
                                    "description": "饿了么新用户首单立减9元",
                                    "icon_color": "70bc46",
                                    "icon_name": "新",
                                    "id": 22984358626,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "新用户立减",
                                    "text_color": "#FFFFFF",
                                    "tips": "饿了么新用户首单立减9元",
                                    "type": 103
                                },
                                {
                                    "attribute": "{0:{\"content\":\"0.1\",\"type\":4}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "特价商品0.1元起",
                                    "icon_color": "f1884f",
                                    "icon_name": "特",
                                    "id": 22816620442,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "特价商品",
                                    "text_color": "#FF4B33",
                                    "tips": "特价商品0.1元起",
                                    "type": 502
                                }
                            ],
                            "address": null,
                            "authentic_id": 167652475,
                            "average_cost": null,
                            "baidu_id": null,
                            "bidding": null,
                            "brand_id": null,
                            "business_info": "{\"pickup_scheme\":\"https://h5.ele.me/shop/#id=E1692830340538186717\",\"ad_info\":{\"isAd\":\"false\"},\"recent_order_num_display\":\"月售919\"}",
                            "closing_count_down": 17771,
                            "delivery_fee_discount": 4.6,
                            "delivery_mode": null,
                            "description": "",
                            "distance": 422,
                            "favor_time": null,
                            "favored": false,
                            "flavors": [{
                                "id": 234,
                                "name": "炸鸡炸串"
                            }],
                            "float_delivery_fee": 0.0,
                            "float_minimum_order_amount": 20.0,
                            "folding_restaurant_brand": null,
                            "folding_restaurants": [

                            ],
                            "has_story": false,
                            "id": "E1692830340538186717",
                            "image_path": "3c07a9478d6c40bfc01aeeb655c70b8bjpeg",
                            "is_new": false,
                            "is_premium": false,
                            "is_star": false,
                            "is_stock_empty": 0,
                            "is_valid": 1,
                            "latitude": 24.522994,
                            "longitude": 117.998521,
                            "max_applied_quantity_per_order": -1,
                            "name": "叫了一只炸鸡.烧鸡(新阳店)",
                            "next_business_time": "明天 10:00",
                            "only_use_poi": null,
                            "opening_hours": [
                                "10:00/2:30"
                            ],
                            "order_lead_time": 33,
                            "out_of_range": false,
                            "phone": null,
                            "piecewise_agent_fee": {
                                "description": "免配送费",
                                "extra_fee": 2.1,
                                "is_extra": true,
                                "no_subsidy_fee": "¥4.6",
                                "rules": [{
                                    "fee": 0.0,
                                    "price": 20.0
                                }],
                                "tips": "免配送费"
                            },
                            "platform": 0,
                            "posters": [

                            ],
                            "promotion_info": "",
                            "rating": 4.6,
                            "rating_count": 1903,
                            "recent_order_num": 919,
                            "recommend": {
                                "is_ad": false,
                                "reason": ""
                            },
                            "recommend_reasons": [{
                                "name": "配送飞快"
                            }],
                            "regular_customer_count": 0,
                            "restaurant_info": null,
                            "scheme": "https://h5.ele.me/shop/#id=E1692830340538186717?o2o_extra_param=%7B%22rank_id%22%3A%22b65750a9f4f84abebe30370a504a75a8%22%7D",
                            "status": 1,
                            "support_tags": [{
                                "border": "dddddd",
                                "color": "666666",
                                "icon": "4e20966ca2a516de3f02fb9c7fd1bc6dpng",
                                "text": "炸鸡炸串",
                                "type": 1
                            }],
                            "supports": [{
                                    "border": "dddddd",
                                    "description": "该商户食品安全已由国泰产险承担，食品安全有保障",
                                    "icon_color": "666666",
                                    "icon_name": "保",
                                    "id": 7,
                                    "name": "食无忧",
                                    "text_color": "666666",
                                    "two_characters_icon_name": "保险"
                                },
                                {
                                    "border": "dddddd",
                                    "description": "退款在订单配送前可免费享受",
                                    "icon_color": "666666",
                                    "icon_name": "退",
                                    "id": 14,
                                    "name": "极速退",
                                    "text_color": "666666",
                                    "two_characters_icon_name": ""
                                }
                            ],
                            "target_tag_path": null,
                            "theme": {
                                "default_color": "2395ff",
                                "header_style": 3,
                                "hongbao_style": 0,
                                "logo_sub": null,
                                "price_color": "ff5339",
                                "third_tab_name": "商家",
                                "vanish_fields": [

                                ]
                            },
                            "type": 0
                        }
                    },
                    {
                        "restaurant": {
                            "act_tag": 0,
                            "activities": [{
                                    "attribute": "{20:{\"content\":\"19\",\"type\":1},30:{\"content\":\"24\",\"type\":1},60:{\"content\":\"45\",\"type\":1},118:{\"content\":\"65\",\"type\":1}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "满20元减19元，满30元减24元，满60元减45元，满118元减65元",
                                    "icon_color": "f07373",
                                    "icon_name": "减",
                                    "id": 22726790850,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "满减优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "满20元减19元，满30元减24元，满60元减45元，满118元减65元",
                                    "type": 102
                                },
                                {
                                    "attribute": "{0:{\"content\":\"3.0\",\"type\":7}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "配送费立减3元",
                                    "icon_color": "70bc46",
                                    "icon_name": "配",
                                    "id": 22737568458,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "配送费优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "配送费立减3元",
                                    "type": 901
                                },
                                {
                                    "attribute": "9",
                                    "background": {
                                        "rgb_from": "#FF4B33",
                                        "rgb_to": "#FF4B33"
                                    },
                                    "border": "#FF4B33",
                                    "description": "饿了么新用户首单立减9元",
                                    "icon_color": "70bc46",
                                    "icon_name": "新",
                                    "id": 22985066306,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "新用户立减",
                                    "text_color": "#FFFFFF",
                                    "tips": "饿了么新用户首单立减9元",
                                    "type": 103
                                },
                                {
                                    "attribute": "{0:{\"content\":\"0.1\",\"type\":4}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "特价商品0.1元起",
                                    "icon_color": "f1884f",
                                    "icon_name": "特",
                                    "id": 22885047690,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "特价商品",
                                    "text_color": "#FF4B33",
                                    "tips": "特价商品0.1元起",
                                    "type": 502
                                },
                                {
                                    "attribute": "{0:{\"content\":\"0.5\",\"type\":2}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "折扣商品5折起",
                                    "icon_color": "3cc791",
                                    "icon_name": "折",
                                    "id": 21957305642,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "折扣优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "折扣商品5折起",
                                    "type": 501
                                }
                            ],
                            "address": null,
                            "authentic_id": 174339535,
                            "average_cost": null,
                            "baidu_id": null,
                            "bidding": null,
                            "brand_id": 552664,
                            "business_info": "{\"pickup_scheme\":\"https://h5.ele.me/shop/#id=E14175927901369427102\",\"ad_info\":{\"isAd\":\"false\"},\"recent_order_num_display\":\"月售2494\"}",
                            "closing_count_down": 17771,
                            "delivery_fee_discount": 3.0,
                            "delivery_mode": null,
                            "description": "各位小主们：本店采用的都是优质整只鸡源，经过数轮的清洗工艺，加上腌制调料腌制数小时，小主们下单后，现裹粉，现炸而成！",
                            "distance": 726,
                            "favor_time": null,
                            "favored": false,
                            "flavors": [{
                                    "id": 978,
                                    "name": "其他小吃"
                                },
                                {
                                    "id": 234,
                                    "name": "炸鸡炸串"
                                }
                            ],
                            "float_delivery_fee": 0.0,
                            "float_minimum_order_amount": 0.0,
                            "folding_restaurant_brand": null,
                            "folding_restaurants": [

                            ],
                            "has_story": false,
                            "id": "E14175927901369427102",
                            "image_path": "57c35528bfa49d4436ec412f08be39d0jpeg",
                            "is_new": false,
                            "is_premium": false,
                            "is_star": false,
                            "is_stock_empty": 0,
                            "is_valid": 1,
                            "latitude": 24.523407,
                            "longitude": 118.000771,
                            "max_applied_quantity_per_order": -1,
                            "name": "叫了只炸鸡(新阳总店)",
                            "next_business_time": "明天 11:00",
                            "only_use_poi": null,
                            "opening_hours": [
                                "11:00/2:30"
                            ],
                            "order_lead_time": 48,
                            "out_of_range": false,
                            "phone": null,
                            "piecewise_agent_fee": {
                                "description": "免配送费",
                                "extra_fee": 0.0,
                                "is_extra": false,
                                "no_subsidy_fee": "¥3",
                                "rules": [{
                                    "fee": 0.0,
                                    "price": 0.0
                                }],
                                "tips": "免配送费"
                            },
                            "platform": 0,
                            "posters": [

                            ],
                            "promotion_info": "各位小主们：本店采用的都是优质整只鸡源，经过数轮的清洗工艺，加上腌制调料腌制数小时，小主们下单后，现裹粉，现炸而成！",
                            "rating": 4.7,
                            "rating_count": 1556,
                            "recent_order_num": 2494,
                            "recommend": {
                                "is_ad": false,
                                "reason": ""
                            },
                            "recommend_reasons": [{
                                    "name": "味道超赞"
                                },
                                {
                                    "name": "回头客多"
                                }
                            ],
                            "regular_customer_count": 0,
                            "restaurant_info": null,
                            "scheme": "https://h5.ele.me/shop/#id=E14175927901369427102?o2o_extra_param=%7B%22rank_id%22%3A%22b65750a9f4f84abebe30370a504a75a8%22%7D",
                            "status": 1,
                            "support_tags": [{
                                "border": "dddddd",
                                "color": "666666",
                                "icon": "4e20966ca2a516de3f02fb9c7fd1bc6dpng",
                                "text": "其他小吃",
                                "type": 1
                            }],
                            "supports": [{
                                "border": "dddddd",
                                "description": "该商户食品安全已由国泰产险承担，食品安全有保障",
                                "icon_color": "666666",
                                "icon_name": "保",
                                "id": 7,
                                "name": "食无忧",
                                "text_color": "666666",
                                "two_characters_icon_name": "保险"
                            }],
                            "target_tag_path": null,
                            "theme": {
                                "default_color": "",
                                "header_style": 3,
                                "hongbao_style": 0,
                                "logo_sub": "e3af66907485b2244532b8166bb648b2png",
                                "price_color": "ff5339",
                                "third_tab_name": "商家",
                                "vanish_fields": [

                                ]
                            },
                            "type": 0
                        }
                    },
                    {
                        "restaurant": {
                            "act_tag": 0,
                            "activities": [{
                                    "attribute": "{25:{\"content\":\"9\",\"type\":1},46:{\"content\":\"12\",\"type\":1},79:{\"content\":\"15\",\"type\":1},150:{\"content\":\"20\",\"type\":1}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "满25元减9元，满46元减12元，满79元减15元，满150元减20元",
                                    "icon_color": "f07373",
                                    "icon_name": "减",
                                    "id": 22976623706,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": false,
                                    "name": "满减优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "满25元减9元，满46元减12元，满79元减15元，满150元减20元",
                                    "type": 102
                                },
                                {
                                    "attribute": "{0:{\"content\":\"4.0\",\"type\":7}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "配送费立减4元",
                                    "icon_color": "70bc46",
                                    "icon_name": "配",
                                    "id": 22875125482,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "配送费优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "配送费立减4元",
                                    "type": 901
                                },
                                {
                                    "attribute": "{88:{\"content\":\"{\\\"name\\\":\\\"香骨鸡腿一个\\\",\\\"unit\\\":\\\"份\\\",\\\"quantity\\\":1,\\\"price\\\":0.0}\",\"type\":3}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "满88元赠送香骨鸡腿一个1份",
                                    "icon_color": "3cc791",
                                    "icon_name": "赠",
                                    "id": 23020009450,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "赠品优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "满88元赠送香骨鸡腿一个1份",
                                    "type": 106
                                },
                                {
                                    "attribute": "{0:{\"content\":\"0.4\",\"type\":2}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "折扣商品4折起",
                                    "icon_color": "3cc791",
                                    "icon_name": "折",
                                    "id": 23019077010,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "折扣优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "折扣商品4折起",
                                    "type": 501
                                },
                                {
                                    "attribute": "{0:{\"content\":\"2\",\"type\":4}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "特价商品2元起",
                                    "icon_color": "f1884f",
                                    "icon_name": "特",
                                    "id": 23014291042,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "特价商品",
                                    "text_color": "#FF4B33",
                                    "tips": "特价商品2元起",
                                    "type": 502
                                }
                            ],
                            "address": null,
                            "authentic_id": 300750613,
                            "average_cost": null,
                            "baidu_id": null,
                            "bidding": "{\"core\":{\"next\":{\"probability\":0.034609999507665634,\"weight\":160,\"restaurantId\":336613890},\"come_from\":1,\"index\":4,\"target\":{\"probability\":0.19031000137329102,\"weight\":100,\"restaurantId\":300750613},\"extraInfo\":\"{\\\"cpxMap\\\":\\\"{\\\\\\\"163214650\\\\\\\":3,\\\\\\\"336613890\\\\\\\":3,\\\\\\\"2276805\\\\\\\":3,\\\\\\\"169743177\\\\\\\":3,\\\\\\\"300750613\\\\\\\":3,\\\\\\\"174213723\\\\\\\":3,\\\\\\\"157816786\\\\\\\":3,\\\\\\\"174025904\\\\\\\":3,\\\\\\\"1939602\\\\\\\":3}\\\",\\\"bidding\\\":\\\"{}\\\",\\\"rankType\\\":\\\"8\\\",\\\"adLogo\\\":\\\"{\\\\\\\"url\\\\\\\":\\\\\\\"https://cube.elemecdn.com/0/1d/49b90a483860967ed3c67dd27714epng.png\\\\\\\",\\\\\\\"position\\\\\\\":\\\\\\\"left-bottom\\\\\\\"}\\\",\\\"latitude\\\":\\\"24.523776\\\",\\\"orientMap\\\":\\\"{\\\\\\\"336613890\\\\\\\":3,\\\\\\\"169743177\\\\\\\":1,\\\\\\\"300750613\\\\\\\":1,\\\\\\\"174025904\\\\\\\":1}\\\",\\\"cityId\\\":\\\"0\\\",\\\"terminal\\\":\\\"browser\\\",\\\"type\\\":\\\"1\\\",\\\"userId\\\":\\\"448507154\\\",\\\"rankId\\\":\\\"b65750a9f4f84abebe30370a504a75a8\\\",\\\"rankTime\\\":\\\"1589117628\\\",\\\"longitude\\\":\\\"117.995661\\\",\\\"trusteeshipIdMap\\\":\\\"{}\\\",\\\"snid\\\":\\\"bffab117-e276-4f50-96db-a698d65023e6\\\",\\\"pidPre\\\":\\\"o2o_102305_200003_100000\\\",\\\"ab_bucket\\\":null,\\\"ab_scene\\\":null}\"}}",
                            "brand_id": 415599,
                            "business_info": "{\"pickup_scheme\":\"https://h5.ele.me/shop/#id=E8549962052218473900\",\"ad_info\":{\"nextId\":\"336613890\",\"probability\":\"0.19031000137329102\",\"weight\":\"100\",\"pid\":\"o2o_102305_200003_100004\",\"etype\":\"1\",\"adInfo\":\"{\\\"cpxMap\\\":\\\"{\\\\\\\"163214650\\\\\\\":3,\\\\\\\"336613890\\\\\\\":3,\\\\\\\"2276805\\\\\\\":3,\\\\\\\"169743177\\\\\\\":3,\\\\\\\"300750613\\\\\\\":3,\\\\\\\"174213723\\\\\\\":3,\\\\\\\"157816786\\\\\\\":3,\\\\\\\"174025904\\\\\\\":3,\\\\\\\"1939602\\\\\\\":3}\\\",\\\"bidding\\\":\\\"{}\\\",\\\"rankType\\\":\\\"8\\\",\\\"adLogo\\\":\\\"{\\\\\\\"url\\\\\\\":\\\\\\\"https://cube.elemecdn.com/0/1d/49b90a483860967ed3c67dd27714epng.png\\\\\\\",\\\\\\\"position\\\\\\\":\\\\\\\"left-bottom\\\\\\\"}\\\",\\\"latitude\\\":\\\"24.523776\\\",\\\"orientMap\\\":\\\"{\\\\\\\"336613890\\\\\\\":3,\\\\\\\"169743177\\\\\\\":1,\\\\\\\"300750613\\\\\\\":1,\\\\\\\"174025904\\\\\\\":1}\\\",\\\"cityId\\\":\\\"0\\\",\\\"terminal\\\":\\\"browser\\\",\\\"type\\\":\\\"1\\\",\\\"userId\\\":\\\"448507154\\\",\\\"rankId\\\":\\\"b65750a9f4f84abebe30370a504a75a8\\\",\\\"rankTime\\\":\\\"1589117628\\\",\\\"longitude\\\":\\\"117.995661\\\",\\\"trusteeshipIdMap\\\":\\\"{}\\\",\\\"snid\\\":\\\"bffab117-e276-4f50-96db-a698d65023e6\\\",\\\"pidPre\\\":\\\"o2o_102305_200003_100000\\\",\\\"ab_bucket\\\":null,\\\"ab_scene\\\":null}\",\"isAd\":\"true\",\"nextProbability\":\"0.034609999507665634\",\"expo\":\"mtop.o2o.ad.exposure.get/1.0/?snid=bffab117-e276-4f50-96db-a698d65023e6&cost=29245484C770E016&pt=102301009&shid=1488340B7F17FD1E3EAF9B7544FCEE39&utype=0&nid=&cnid=&cpx=3&p=%7B%22rankId%22%3A%22b65750a9f4f84abebe30370a504a75a8%22%2C%22cpx%22%3A%223%22%2C%22terminal%22%3A%22browser%22%2C%22type%22%3A%221%22%2C%22orientType%22%3A%221%22%2C%22city_id%22%3A%220%22%7D&uid=448507154&bid=DC6DD14D455F01F7&aid=1488340B7F17FD1E3EAF9B7544FCEE39&cid=&ts=1589117628335&pid=o2o_102305_200003_100004\",\"targetUrlParams\":\"{\\\"o2o\\\":\\\"mtop.life.ad.click.get/1.0/?snid=bffab117-e276-4f50-96db-a698d65023e6&cost=29245484C770E016&pt=102301009&shid=1488340B7F17FD1E3EAF9B7544FCEE39&utype=0&nid=&cnid=&cpx=3&p=%7B%22rankId%22%3A%22b65750a9f4f84abebe30370a504a75a8%22%2C%22cpx%22%3A%223%22%2C%22terminal%22%3A%22browser%22%2C%22type%22%3A%221%22%2C%22orientType%22%3A%221%22%2C%22city_id%22%3A%220%22%7D&uid=448507154&bid=DC6DD14D455F01F7&aid=1488340B7F17FD1E3EAF9B7544FCEE39&cid=&ts=1589117628335&pid=o2o_102305_200003_100004\\\",\\\"etype\\\":\\\"1\\\",\\\"epid\\\":\\\"o2o_102305_200003_100004\\\"}\",\"nextWeight\":\"160\"},\"recent_order_num_display\":\"月售491\"}",
                            "closing_count_down": 5471,
                            "delivery_fee_discount": 4.0,
                            "delivery_mode": null,
                            "description": "茶巢就是好喝",
                            "distance": 2339,
                            "favor_time": null,
                            "favored": false,
                            "flavors": [{
                                    "id": 240,
                                    "name": "奶茶果汁"
                                },
                                {
                                    "id": 249,
                                    "name": "蛋糕"
                                }
                            ],
                            "float_delivery_fee": 1.1,
                            "float_minimum_order_amount": 0.0,
                            "folding_restaurant_brand": null,
                            "folding_restaurants": [

                            ],
                            "has_story": false,
                            "id": "E8549962052218473900",
                            "image_path": "7b4db8e43ac116033ad77ba791c22808jpeg",
                            "is_new": false,
                            "is_premium": true,
                            "is_star": false,
                            "is_stock_empty": 0,
                            "is_valid": 1,
                            "latitude": 24.528936,
                            "longitude": 117.980144,
                            "max_applied_quantity_per_order": -1,
                            "name": "茶巢(祥露店)",
                            "next_business_time": "明天 9:35",
                            "only_use_poi": null,
                            "opening_hours": [
                                "9:35/23:05"
                            ],
                            "order_lead_time": 31,
                            "out_of_range": false,
                            "phone": null,
                            "piecewise_agent_fee": {
                                "description": "夜间配送¥1.1",
                                "extra_fee": 2.6,
                                "is_extra": true,
                                "no_subsidy_fee": "¥5.1",
                                "rules": [{
                                    "fee": 1.1,
                                    "price": 0.0
                                }],
                                "tips": "夜间配送¥1.1"
                            },
                            "platform": 0,
                            "posters": [

                            ],
                            "promotion_info": "3杯奶茶两杯的价格，",
                            "rating": 4.7,
                            "rating_count": 121,
                            "recent_order_num": 491,
                            "recommend": {
                                "image_hash": "731111f3f9379e772eedf4855beae8a1jpeg",
                                "is_ad": true,
                                "reason": "",
                                "track": "{\"rankType\":\"8\"}"
                            },
                            "recommend_reasons": [{
                                "name": "配送飞快"
                            }],
                            "regular_customer_count": 0,
                            "restaurant_info": null,
                            "scheme": "https://h5.ele.me/shop/#id=E8549962052218473900?o2o_extra_param=%7B%22rank_id%22%3A%22b65750a9f4f84abebe30370a504a75a8%22%7D&epid=o2o_102305_200003_100004&etype=1&o2o=mtop.life.ad.click.get%2F1.0%2F%3Fsnid%3Dbffab117-e276-4f50-96db-a698d65023e6%26cost%3D29245484C770E016%26pt%3D102301009%26shid%3D1488340B7F17FD1E3EAF9B7544FCEE39%26utype%3D0%26nid%3D%26cnid%3D%26cpx%3D3%26p%3D%257B%2522rankId%2522%253A%2522b65750a9f4f84abebe30370a504a75a8%2522%252C%2522cpx%2522%253A%25223%2522%252C%2522terminal%2522%253A%2522browser%2522%252C%2522type%2522%253A%25221%2522%252C%2522orientType%2522%253A%25221%2522%252C%2522city_id%2522%253A%25220%2522%257D%26uid%3D448507154%26bid%3DDC6DD14D455F01F7%26aid%3D1488340B7F17FD1E3EAF9B7544FCEE39%26cid%3D%26ts%3D1589117628335%26pid%3Do2o_102305_200003_100004",
                            "status": 1,
                            "support_tags": [{
                                "border": "dddddd",
                                "color": "666666",
                                "icon": "4e20966ca2a516de3f02fb9c7fd1bc6dpng",
                                "text": "奶茶果汁",
                                "type": 1
                            }],
                            "supports": [{
                                "border": "dddddd",
                                "description": "该商户食品安全已由国泰产险承担，食品安全有保障",
                                "icon_color": "666666",
                                "icon_name": "保",
                                "id": 7,
                                "name": "食无忧",
                                "text_color": "666666",
                                "two_characters_icon_name": "保险"
                            }],
                            "target_tag_path": "d53fc0cb4dc67973038cbc591938a1b6png",
                            "theme": {
                                "default_color": "2395ff",
                                "header_style": 3,
                                "hongbao_style": 0,
                                "logo_sub": null,
                                "price_color": "ff5339",
                                "third_tab_name": "商家",
                                "vanish_fields": [

                                ]
                            },
                            "type": 0
                        }
                    },
                    {
                        "restaurant": {
                            "act_tag": 0,
                            "activities": [{
                                "attribute": "9",
                                "background": {
                                    "rgb_from": "#FF4B33",
                                    "rgb_to": "#FF4B33"
                                },
                                "border": "#FF4B33",
                                "description": "饿了么新用户首单立减9元",
                                "icon_color": "70bc46",
                                "icon_name": "新",
                                "id": 22984550434,
                                "image_hash": null,
                                "is_exclusive_with_food_activity": true,
                                "name": "新用户立减",
                                "text_color": "#FFFFFF",
                                "tips": "饿了么新用户首单立减9元",
                                "type": 103
                            }],
                            "address": null,
                            "authentic_id": 155899081,
                            "average_cost": null,
                            "baidu_id": null,
                            "bidding": null,
                            "brand_id": null,
                            "business_info": "{\"pickup_scheme\":\"https://h5.ele.me/shop/#id=E312241309367982603\",\"ad_info\":{\"isAd\":\"false\"},\"recent_order_num_display\":\"月售152\"}",
                            "closing_count_down": 1571,
                            "delivery_fee_discount": 0.0,
                            "delivery_mode": null,
                            "description": "",
                            "distance": 1850,
                            "favor_time": null,
                            "favored": false,
                            "flavors": [{
                                "id": 754,
                                "name": "米粉米线"
                            }],
                            "float_delivery_fee": 4.6,
                            "float_minimum_order_amount": 20.0,
                            "folding_restaurant_brand": null,
                            "folding_restaurants": [

                            ],
                            "has_story": false,
                            "id": "E312241309367982603",
                            "image_path": "da8f760ed1ab856239876b4927d0b842jpeg",
                            "is_new": false,
                            "is_premium": false,
                            "is_star": false,
                            "is_stock_empty": 0,
                            "is_valid": 1,
                            "latitude": 24.524804,
                            "longitude": 118.008675,
                            "max_applied_quantity_per_order": -1,
                            "name": "五谷鱼粉（新光店）",
                            "next_business_time": "明天 8:30",
                            "only_use_poi": null,
                            "opening_hours": [
                                "8:30/22:00"
                            ],
                            "order_lead_time": 30,
                            "out_of_range": false,
                            "phone": null,
                            "piecewise_agent_fee": {
                                "description": "夜间配送¥4.6",
                                "extra_fee": 2.1,
                                "is_extra": true,
                                "no_subsidy_fee": "",
                                "rules": [{
                                    "fee": 4.6,
                                    "price": 20.0
                                }],
                                "tips": "夜间配送¥4.6"
                            },
                            "platform": 0,
                            "posters": [

                            ],
                            "promotion_info": "",
                            "rating": 4.2,
                            "rating_count": 781,
                            "recent_order_num": 152,
                            "recommend": {
                                "is_ad": false,
                                "reason": ""
                            },
                            "recommend_reasons": [{
                                "name": "配送飞快"
                            }],
                            "regular_customer_count": 0,
                            "restaurant_info": null,
                            "scheme": "https://h5.ele.me/shop/#id=E312241309367982603?o2o_extra_param=%7B%22rank_id%22%3A%22b65750a9f4f84abebe30370a504a75a8%22%7D",
                            "status": 1,
                            "support_tags": [{
                                "border": "dddddd",
                                "color": "666666",
                                "icon": "4e20966ca2a516de3f02fb9c7fd1bc6dpng",
                                "text": "米粉米线",
                                "type": 1
                            }],
                            "supports": [{
                                "border": "dddddd",
                                "description": "该商户食品安全已由国泰产险承担，食品安全有保障",
                                "icon_color": "666666",
                                "icon_name": "保",
                                "id": 7,
                                "name": "食无忧",
                                "text_color": "666666",
                                "two_characters_icon_name": "保险"
                            }],
                            "target_tag_path": null,
                            "theme": {
                                "default_color": "2395ff",
                                "header_style": 3,
                                "hongbao_style": 0,
                                "logo_sub": null,
                                "price_color": "ff5339",
                                "third_tab_name": "商家",
                                "vanish_fields": [

                                ]
                            },
                            "type": 0
                        }
                    },
                    {
                        "restaurant": {
                            "act_tag": 0,
                            "activities": [{
                                    "attribute": "{20:{\"content\":\"5\",\"type\":1},30:{\"content\":\"15\",\"type\":1},75:{\"content\":\"28\",\"type\":1},135:{\"content\":\"34\",\"type\":1},150:{\"content\":\"45\",\"type\":1}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "满20元减5元，满30元减15元，满75元减28元，满135元减34元，满150元减45元",
                                    "icon_color": "f07373",
                                    "icon_name": "减",
                                    "id": 22687317971,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "满减优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "满20元减5元，满30元减15元，满75元减28元，满135元减34元，满150元减45元",
                                    "type": 102
                                },
                                {
                                    "attribute": "{0:{\"content\":\"3\",\"type\":7}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "配送费立减3元",
                                    "icon_color": "70bc46",
                                    "icon_name": "配",
                                    "id": 22984990907,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "配送费优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "配送费立减3元",
                                    "type": 901
                                },
                                {
                                    "attribute": "{0:{\"content\":\"1.0\",\"type\":1}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "首次光顾本店立减1元",
                                    "icon_color": "70bc46",
                                    "icon_name": "首",
                                    "id": 22747147082,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "首单立减",
                                    "text_color": "#FF4B33",
                                    "tips": "首次光顾本店立减1元",
                                    "type": 108
                                },
                                {
                                    "attribute": "9",
                                    "background": {
                                        "rgb_from": "#FF4B33",
                                        "rgb_to": "#FF4B33"
                                    },
                                    "border": "#FF4B33",
                                    "description": "饿了么新用户首单立减9元",
                                    "icon_color": "70bc46",
                                    "icon_name": "新",
                                    "id": 22984535394,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "新用户立减",
                                    "text_color": "#FFFFFF",
                                    "tips": "饿了么新用户首单立减9元",
                                    "type": 103
                                },
                                {
                                    "attribute": "{170:{\"content\":\"{\\\"name\\\":\\\"易拉罐雪碧 \\\",\\\"unit\\\":\\\"份\\\",\\\"quantity\\\":1,\\\"price\\\":0.0}\",\"type\":3},220:{\"content\":\"{\\\"name\\\":\\\"易拉罐雪碧 \\\",\\\"unit\\\":\\\"份\\\",\\\"quantity\\\":2,\\\"price\\\":0.0}\",\"type\":3},250:{\"content\":\"{\\\"name\\\":\\\"易拉罐雪碧 \\\",\\\"unit\\\":\\\"份\\\",\\\"quantity\\\":3,\\\"price\\\":0.0}\",\"type\":3},400:{\"content\":\"{\\\"name\\\":\\\"易拉罐雪碧 \\\",\\\"unit\\\":\\\"份\\\",\\\"quantity\\\":4,\\\"price\\\":0.0}\",\"type\":3},500:{\"content\":\"{\\\"name\\\":\\\"易拉罐雪碧 \\\",\\\"unit\\\":\\\"份\\\",\\\"quantity\\\":5,\\\"price\\\":0.0}\",\"type\":3}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "满170元赠送易拉罐雪碧 1份，满220元赠送易拉罐雪碧 2份，满250元赠送易拉罐雪碧 3份，满400元赠送易拉罐雪碧 4份，满500元赠送易拉罐雪碧 5份",
                                    "icon_color": "3cc791",
                                    "icon_name": "赠",
                                    "id": 22936225906,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": false,
                                    "name": "赠品优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "满170元赠送易拉罐雪碧 1份，满220元赠送易拉罐雪碧 2份，满250元赠送易拉罐雪碧 3份，满400元赠送易拉罐雪碧 4份，满500元赠送易拉罐雪碧 5份",
                                    "type": 106
                                },
                                {
                                    "attribute": "{0:{\"content\":\"0.8\",\"type\":4}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "特价商品0.8元起",
                                    "icon_color": "f1884f",
                                    "icon_name": "特",
                                    "id": 22936204906,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "特价商品",
                                    "text_color": "#FF4B33",
                                    "tips": "特价商品0.8元起",
                                    "type": 502
                                },
                                {
                                    "attribute": "{0:{\"content\":\"0.98\",\"type\":2}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "折扣商品98折起",
                                    "icon_color": "3cc791",
                                    "icon_name": "折",
                                    "id": 22737391018,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "折扣优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "折扣商品98折起",
                                    "type": 501
                                }
                            ],
                            "address": null,
                            "authentic_id": 336613890,
                            "average_cost": null,
                            "baidu_id": null,
                            "bidding": "{\"core\":{\"next\":{\"probability\":0.05076000094413757,\"weight\":80,\"restaurantId\":157816786},\"come_from\":1,\"index\":6,\"target\":{\"probability\":0.034609999507665634,\"weight\":160,\"restaurantId\":336613890},\"extraInfo\":\"{\\\"cpxMap\\\":\\\"{\\\\\\\"163214650\\\\\\\":3,\\\\\\\"336613890\\\\\\\":3,\\\\\\\"2276805\\\\\\\":3,\\\\\\\"169743177\\\\\\\":3,\\\\\\\"300750613\\\\\\\":3,\\\\\\\"174213723\\\\\\\":3,\\\\\\\"157816786\\\\\\\":3,\\\\\\\"174025904\\\\\\\":3,\\\\\\\"1939602\\\\\\\":3}\\\",\\\"bidding\\\":\\\"{}\\\",\\\"rankType\\\":\\\"8\\\",\\\"adLogo\\\":\\\"{\\\\\\\"url\\\\\\\":\\\\\\\"https://cube.elemecdn.com/0/1d/49b90a483860967ed3c67dd27714epng.png\\\\\\\",\\\\\\\"position\\\\\\\":\\\\\\\"left-bottom\\\\\\\"}\\\",\\\"latitude\\\":\\\"24.523776\\\",\\\"orientMap\\\":\\\"{\\\\\\\"336613890\\\\\\\":3,\\\\\\\"169743177\\\\\\\":1,\\\\\\\"300750613\\\\\\\":1,\\\\\\\"174025904\\\\\\\":1}\\\",\\\"cityId\\\":\\\"0\\\",\\\"terminal\\\":\\\"browser\\\",\\\"type\\\":\\\"1\\\",\\\"userId\\\":\\\"448507154\\\",\\\"rankId\\\":\\\"b65750a9f4f84abebe30370a504a75a8\\\",\\\"rankTime\\\":\\\"1589117628\\\",\\\"longitude\\\":\\\"117.995661\\\",\\\"trusteeshipIdMap\\\":\\\"{}\\\",\\\"snid\\\":\\\"bffab117-e276-4f50-96db-a698d65023e6\\\",\\\"pidPre\\\":\\\"o2o_102305_200003_100000\\\",\\\"ab_bucket\\\":null,\\\"ab_scene\\\":null}\"}}",
                            "brand_id": null,
                            "business_info": "{\"pickup_scheme\":\"https://h5.ele.me/shop/#id=E13102547290183058153\",\"ad_info\":{\"nextId\":\"157816786\",\"probability\":\"0.034609999507665634\",\"weight\":\"160\",\"pid\":\"o2o_102305_200003_100006\",\"etype\":\"1\",\"adInfo\":\"{\\\"cpxMap\\\":\\\"{\\\\\\\"163214650\\\\\\\":3,\\\\\\\"336613890\\\\\\\":3,\\\\\\\"2276805\\\\\\\":3,\\\\\\\"169743177\\\\\\\":3,\\\\\\\"300750613\\\\\\\":3,\\\\\\\"174213723\\\\\\\":3,\\\\\\\"157816786\\\\\\\":3,\\\\\\\"174025904\\\\\\\":3,\\\\\\\"1939602\\\\\\\":3}\\\",\\\"bidding\\\":\\\"{}\\\",\\\"rankType\\\":\\\"8\\\",\\\"adLogo\\\":\\\"{\\\\\\\"url\\\\\\\":\\\\\\\"https://cube.elemecdn.com/0/1d/49b90a483860967ed3c67dd27714epng.png\\\\\\\",\\\\\\\"position\\\\\\\":\\\\\\\"left-bottom\\\\\\\"}\\\",\\\"latitude\\\":\\\"24.523776\\\",\\\"orientMap\\\":\\\"{\\\\\\\"336613890\\\\\\\":3,\\\\\\\"169743177\\\\\\\":1,\\\\\\\"300750613\\\\\\\":1,\\\\\\\"174025904\\\\\\\":1}\\\",\\\"cityId\\\":\\\"0\\\",\\\"terminal\\\":\\\"browser\\\",\\\"type\\\":\\\"1\\\",\\\"userId\\\":\\\"448507154\\\",\\\"rankId\\\":\\\"b65750a9f4f84abebe30370a504a75a8\\\",\\\"rankTime\\\":\\\"1589117628\\\",\\\"longitude\\\":\\\"117.995661\\\",\\\"trusteeshipIdMap\\\":\\\"{}\\\",\\\"snid\\\":\\\"bffab117-e276-4f50-96db-a698d65023e6\\\",\\\"pidPre\\\":\\\"o2o_102305_200003_100000\\\",\\\"ab_bucket\\\":null,\\\"ab_scene\\\":null}\",\"isAd\":\"true\",\"nextProbability\":\"0.05076000094413757\",\"expo\":\"mtop.o2o.ad.exposure.get/1.0/?snid=bffab117-e276-4f50-96db-a698d65023e6&cost=22D869838B8D4DC8&pt=102301009&shid=CE1FCBAD5A13D2BEF2372A6781EC94E3&utype=0&nid=&cnid=&cpx=3&p=%7B%22rankId%22%3A%22b65750a9f4f84abebe30370a504a75a8%22%2C%22cpx%22%3A%223%22%2C%22terminal%22%3A%22browser%22%2C%22type%22%3A%221%22%2C%22orientType%22%3A%223%22%2C%22city_id%22%3A%220%22%7D&uid=448507154&bid=D46D1A96D2F19775&aid=CE1FCBAD5A13D2BEF2372A6781EC94E3&cid=&ts=1589117628335&pid=o2o_102305_200003_100006\",\"targetUrlParams\":\"{\\\"o2o\\\":\\\"mtop.life.ad.click.get/1.0/?snid=bffab117-e276-4f50-96db-a698d65023e6&cost=22D869838B8D4DC8&pt=102301009&shid=CE1FCBAD5A13D2BEF2372A6781EC94E3&utype=0&nid=&cnid=&cpx=3&p=%7B%22rankId%22%3A%22b65750a9f4f84abebe30370a504a75a8%22%2C%22cpx%22%3A%223%22%2C%22terminal%22%3A%22browser%22%2C%22type%22%3A%221%22%2C%22orientType%22%3A%223%22%2C%22city_id%22%3A%220%22%7D&uid=448507154&bid=D46D1A96D2F19775&aid=CE1FCBAD5A13D2BEF2372A6781EC94E3&cid=&ts=1589117628335&pid=o2o_102305_200003_100006\\\",\\\"etype\\\":\\\"1\\\",\\\"epid\\\":\\\"o2o_102305_200003_100006\\\"}\",\"nextWeight\":\"80\"},\"recent_order_num_display\":\"月售1070\"}",
                            "closing_count_down": 1571,
                            "delivery_fee_discount": 3.0,
                            "delivery_mode": {
                                "border": "",
                                "color": "2395FF",
                                "gradient": {
                                    "rgb_from": "00a6ff",
                                    "rgb_to": "00a6ff"
                                },
                                "icon_hash": "b9b45d2f6ff0dbeef3a78ef0e4e90abapng",
                                "id": 1,
                                "is_solid": true,
                                "text": "蜂鸟专送",
                                "text_color": "FFFFFF"
                            },
                            "description": "湾仔大丰收为时尚快捷融合菜及私房特色鱼庄结合现代装修风格.精益求精.本着诚信的职业道德.以人为本! 的原则去经营。",
                            "distance": 2378,
                            "favor_time": null,
                            "favored": false,
                            "flavors": [{
                                "id": 1298,
                                "name": "鱼火锅"
                            }],
                            "float_delivery_fee": 2.6,
                            "float_minimum_order_amount": 20.0,
                            "folding_restaurant_brand": null,
                            "folding_restaurants": [

                            ],
                            "has_story": false,
                            "id": "E13102547290183058153",
                            "image_path": "97720ec6fd3c0059a8ebae28ce0609c4jpeg",
                            "is_new": false,
                            "is_premium": false,
                            "is_star": false,
                            "is_stock_empty": 0,
                            "is_valid": 1,
                            "latitude": 24.530638,
                            "longitude": 118.010668,
                            "max_applied_quantity_per_order": -1,
                            "name": "湾仔大丰收鱼庄(马銮湾生活广场店)",
                            "next_business_time": "明天 10:00",
                            "only_use_poi": null,
                            "opening_hours": [
                                "10:00/22:00"
                            ],
                            "order_lead_time": 30,
                            "out_of_range": false,
                            "phone": null,
                            "piecewise_agent_fee": {
                                "description": "夜间配送¥2.6",
                                "extra_fee": 2.6,
                                "is_extra": true,
                                "no_subsidy_fee": "¥5.6",
                                "rules": [{
                                    "fee": 2.6,
                                    "price": 20.0
                                }],
                                "tips": "夜间配送¥2.6"
                            },
                            "platform": 0,
                            "posters": [

                            ],
                            "promotion_info": "本店支持并提倡环保，除点米饭，套餐外，其他没有点一次性餐具，默认不需要。诚信经营！以人为本！用心做！安心外卖！您的安全我们来守护！",
                            "rating": 4.6,
                            "rating_count": 246,
                            "recent_order_num": 1070,
                            "recommend": {
                                "image_hash": "731111f3f9379e772eedf4855beae8a1jpeg",
                                "is_ad": true,
                                "reason": "",
                                "track": "{\"rankType\":\"8\"}"
                            },
                            "recommend_reasons": [{
                                "name": "配送飞快"
                            }],
                            "regular_customer_count": 0,
                            "restaurant_info": null,
                            "scheme": "https://h5.ele.me/shop/#id=E13102547290183058153?o2o_extra_param=%7B%22rank_id%22%3A%22b65750a9f4f84abebe30370a504a75a8%22%7D&epid=o2o_102305_200003_100006&etype=1&o2o=mtop.life.ad.click.get%2F1.0%2F%3Fsnid%3Dbffab117-e276-4f50-96db-a698d65023e6%26cost%3D22D869838B8D4DC8%26pt%3D102301009%26shid%3DCE1FCBAD5A13D2BEF2372A6781EC94E3%26utype%3D0%26nid%3D%26cnid%3D%26cpx%3D3%26p%3D%257B%2522rankId%2522%253A%2522b65750a9f4f84abebe30370a504a75a8%2522%252C%2522cpx%2522%253A%25223%2522%252C%2522terminal%2522%253A%2522browser%2522%252C%2522type%2522%253A%25221%2522%252C%2522orientType%2522%253A%25223%2522%252C%2522city_id%2522%253A%25220%2522%257D%26uid%3D448507154%26bid%3DD46D1A96D2F19775%26aid%3DCE1FCBAD5A13D2BEF2372A6781EC94E3%26cid%3D%26ts%3D1589117628335%26pid%3Do2o_102305_200003_100006",
                            "status": 1,
                            "support_tags": [{
                                "border": "dddddd",
                                "color": "666666",
                                "icon": "4e20966ca2a516de3f02fb9c7fd1bc6dpng",
                                "text": "鱼火锅",
                                "type": 1
                            }],
                            "supports": [{
                                "border": "dddddd",
                                "description": "该商户食品安全已由国泰产险承担，食品安全有保障",
                                "icon_color": "666666",
                                "icon_name": "保",
                                "id": 7,
                                "name": "食无忧",
                                "text_color": "666666",
                                "two_characters_icon_name": "保险"
                            }],
                            "target_tag_path": null,
                            "theme": {
                                "default_color": "2395ff",
                                "header_style": 3,
                                "hongbao_style": 0,
                                "logo_sub": null,
                                "price_color": "ff5339",
                                "third_tab_name": "商家",
                                "vanish_fields": [

                                ]
                            },
                            "type": 0
                        }
                    },
                    {
                        "restaurant": {
                            "act_tag": 0,
                            "activities": [{
                                    "attribute": "{16:{\"content\":\"15\",\"type\":1},17:{\"content\":\"16\",\"type\":1},45:{\"content\":\"38\",\"type\":1},90:{\"content\":\"58\",\"type\":1},140:{\"content\":\"79\",\"type\":1}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "满16元减15元，满17元减16元，满45元减38元，满90元减58元，满140元减79元",
                                    "icon_color": "f07373",
                                    "icon_name": "减",
                                    "id": 22672435882,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "满减优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "满16元减15元，满17元减16元，满45元减38元，满90元减58元，满140元减79元",
                                    "type": 102
                                },
                                {
                                    "attribute": "{0:{\"content\":\"6.5\",\"type\":7}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "配送费立减6.5元",
                                    "icon_color": "70bc46",
                                    "icon_name": "配",
                                    "id": 22999029715,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "配送费优惠",
                                    "text_color": "#FF4B33",
                                    "tips": "配送费立减6.5元",
                                    "type": 901
                                },
                                {
                                    "attribute": "{0:{\"content\":\"1.0\",\"type\":1}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "首次光顾本店立减1元",
                                    "icon_color": "70bc46",
                                    "icon_name": "首",
                                    "id": 22677224994,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "首单立减",
                                    "text_color": "#FF4B33",
                                    "tips": "首次光顾本店立减1元",
                                    "type": 108
                                },
                                {
                                    "attribute": "9",
                                    "background": {
                                        "rgb_from": "#FF4B33",
                                        "rgb_to": "#FF4B33"
                                    },
                                    "border": "#FF4B33",
                                    "description": "饿了么新用户首单立减9元",
                                    "icon_color": "70bc46",
                                    "icon_name": "新",
                                    "id": 22984405138,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "新用户立减",
                                    "text_color": "#FFFFFF",
                                    "tips": "饿了么新用户首单立减9元",
                                    "type": 103
                                },
                                {
                                    "attribute": "{0:{\"content\":\"0.5\",\"type\":4}}",
                                    "background": {
                                        "rgb_from": "#FFFFFF",
                                        "rgb_to": "#FFFFFF"
                                    },
                                    "border": "#FFC9C1",
                                    "description": "特价商品0.5元起",
                                    "icon_color": "f1884f",
                                    "icon_name": "特",
                                    "id": 23016102802,
                                    "image_hash": null,
                                    "is_exclusive_with_food_activity": true,
                                    "name": "特价商品",
                                    "text_color": "#FF4B33",
                                    "tips": "特价商品0.5元起",
                                    "type": 502
                                }
                            ],
                            "address": null,
                            "authentic_id": 146347062,
                            "average_cost": null,
                            "baidu_id": null,
                            "bidding": null,
                            "brand_id": 447308,
                            "business_info": "{\"pickup_scheme\":\"https://h5.ele.me/shop/#id=E9365915041380565038\",\"ad_info\":{\"isAd\":\"false\"},\"recent_order_num_display\":\"月售4181\"}",
                            "closing_count_down": 1571,
                            "delivery_fee_discount": 4.6,
                            "delivery_mode": null,
                            "description": "",
                            "distance": 524,
                            "favor_time": null,
                            "favored": false,
                            "flavors": [{
                                    "id": 209,
                                    "name": "盖浇饭"
                                },
                                {
                                    "id": 266,
                                    "name": "烧腊饭"
                                }
                            ],
                            "float_delivery_fee": 0.0,
                            "float_minimum_order_amount": 15.0,
                            "folding_restaurant_brand": null,
                            "folding_restaurants": [

                            ],
                            "has_story": false,
                            "id": "E9365915041380565038",
                            "image_path": "261dd37ef034a8473bd6b7444065e782jpeg",
                            "is_new": false,
                            "is_premium": false,
                            "is_star": false,
                            "is_stock_empty": 0,
                            "is_valid": 1,
                            "latitude": 24.525212,
                            "longitude": 117.999014,
                            "max_applied_quantity_per_order": -1,
                            "name": "明记猪脚饭(海沧店)",
                            "next_business_time": "明天 9:40",
                            "only_use_poi": null,
                            "opening_hours": [
                                "9:40/14:30",
                                "16:20/22:00"
                            ],
                            "order_lead_time": 30,
                            "out_of_range": false,
                            "phone": null,
                            "piecewise_agent_fee": {
                                "description": "免配送费",
                                "extra_fee": 2.1,
                                "is_extra": true,
                                "no_subsidy_fee": "¥4.6",
                                "rules": [{
                                    "fee": 0.0,
                                    "price": 15.0
                                }],
                                "tips": "免配送费"
                            },
                            "platform": 0,
                            "posters": [

                            ],
                            "promotion_info": "非常感谢新老客户的支持。您的支持是我们不断向前的原动力！我们非常地重视与您的这份感情并愿意珍惜到底！然：由于近期肉的原材料成本一路上涨，至我们商家成本压力太大！ 10月25日起价格有上调一部分，望大家理解。谢谢\n",
                            "rating": 4.4,
                            "rating_count": 19614,
                            "recent_order_num": 4181,
                            "recommend": {
                                "is_ad": false,
                                "reason": ""
                            },
                            "recommend_reasons": [{
                                "name": "配送飞快"
                            }],
                            "regular_customer_count": 0,
                            "restaurant_info": null,
                            "scheme": "https://h5.ele.me/shop/#id=E9365915041380565038?o2o_extra_param=%7B%22rank_id%22%3A%22b65750a9f4f84abebe30370a504a75a8%22%7D",
                            "status": 1,
                            "support_tags": [{
                                "border": "dddddd",
                                "color": "666666",
                                "icon": "4e20966ca2a516de3f02fb9c7fd1bc6dpng",
                                "text": "盖浇饭",
                                "type": 1
                            }],
                            "supports": [{
                                    "border": "dddddd",
                                    "description": "该商户食品安全已由国泰产险承担，食品安全有保障",
                                    "icon_color": "666666",
                                    "icon_name": "保",
                                    "id": 7,
                                    "name": "食无忧",
                                    "text_color": "666666",
                                    "two_characters_icon_name": "保险"
                                },
                                {
                                    "border": "dddddd",
                                    "description": "该商家支持开发票，请在下单时填写好发票抬头",
                                    "icon_color": "666666",
                                    "icon_name": "票",
                                    "id": 4,
                                    "name": "开发票",
                                    "text_color": "666666",
                                    "two_characters_icon_name": "发票"
                                }
                            ],
                            "target_tag_path": null,
                            "theme": {
                                "default_color": "2395ff",
                                "header_style": 3,
                                "hongbao_style": 0,
                                "logo_sub": null,
                                "price_color": "ff5339",
                                "third_tab_name": "商家",
                                "vanish_fields": [

                                ]
                            },
                            "type": 0
                        }
                    }
                ],
                isLoading: false,
                order: null,
                lastOrder: null,
            }
        },
        activated() {
            if (!localStorage.getItem("userId")) {
                this.setIsLogin(false);
            } else {
                this.queryIsLogin();
            }
            this.queryEntryList();
            // 登录的时候访问饭店列表
            if (this.isLogin) {
                // this.resList()
            }
        },
        mounted() {
            this.getPosition();
            if (this.isLogin) {
                // this.resList()
            }
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
                    if (!this.isLoading) {
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