<template>
    <div class="res-root">
        <!-- 商家信息 -->
        <div class="res-info">
            <!-- 商家图片 -->
            <div class="image-box">
                <div class="new-res-bgc" v-if="restaurant.is_new">
                    <span class="new-res-title">新店</span>
                </div>
                <img :src="imgFilter(restaurant.image_path)" alt="" class="res-img">
            </div>
            <!-- 商家图片右侧信息 -->
            <div class="res-info-right">
                <!-- 商家名称详情 -->
                <div class="res-info-detail">
                    <div class="res-info-name">
                        <span v-if="brand" class="brand">品牌</span>
                        <span class="res-name">{{restaurant.name}}</span>
                    </div>
                    <div class="unlike">
                        <span class="showMore">···</span>
                    </div>
                </div>

                <!-- 商家评分详情 -->
                <div class="rate">
                    <star :score="restaurant.rating" width="10px"></star>
                    <div class="rate-detail">
                        <span class="rateHolder">*</span>
                        <span>{{restaurant.rating}}</span>
                        <span class="rateHolder">**</span>
                        <span>月售{{restaurant.recent_order_num}}单</span>
                    </div>
                    <div v-if="isMode" class="delivery-mode" :style="deliveryStyle">{{restaurant.delivery_mode.text}}
                    </div>
                </div>
                <!-- 配送相关 -->
                <div class="res-delivery">
                    <div class="res-delivery-fee">
                        <span>￥{{restaurant.float_minimum_order_amount}}起送</span>
                        <span class="holder">|</span>
                        <span>{{restaurant.piecewise_agent_fee.description}}</span>
                    </div>
                    <div class="res-delivery-distance">
                        <span>{{restaurant.distance|distanceDecration}}</span>
                        <span class="holder">|</span>
                        <span>{{restaurant.order_lead_time|timeDecration}}</span>
                    </div>
                </div>

            </div>
        </div>
        <!-- 特色菜 -->
        <div class="res-info">
            <div class="res-img-c"></div>
            <div class="res-info-special">
                <span v-for="(v, index) in restaurant.flavors" :key="index"
                    class="res-info-special-item">{{v.name}}</span>
            </div>
        </div>
        <!-- 活动内容 -->
        <div class="res-info">
            <div class="res-img-c"></div>
            <div class="res-info-activity">
                <div v-for="(v, index) in activities" :key="index">
                    <activity :activities="v"></activity>
                </div>
                <div class="activities-indicator" @click="activiClick">
                    <span>{{(restaurant.activities).concat(restaurant.supports).length}}个活动</span>
                    <span class="narrow" :style="narrowStyle">▲</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import imgFilter from "@/util/imgFilter.js";
    import star from './Star.vue'
    import activity from './Activity.vue'
    export default {
        data() {
            return {
                brand_id: false,
                isOpen: false,
                rootHeight: "",
            }
        },
        // 需要传递进来饭店
        props: ["restaurant"],
        methods: {
            imgFilter,
            activiClick() {
                this.isOpen = !this.isOpen;
                console.log(this.isOpen);
            }
        },
        computed: {
            brand() {
                if (this.restaurant.brand_id) {
                    return this.brand_id = true;
                }
                return this.brand_id = false;
            },
            activities() {
                if (this.isOpen) {
                    return (this.restaurant.activities).concat(this.restaurant.supports)
                }
                return ((this.restaurant.activities).concat(this.restaurant.supports)).slice(0, 2)
            },
            restaurantStyle() {
                if (this.isOpen) {
                    return {
                        height: ""
                    }
                    return {
                        height: "20vh"
                    }
                }
            },
            narrowStyle() {
                if (this.isOpen) {
                    return {
                        transform: "rotate(180deg)"
                    }
                }
                return {
                    transform: "rotate(0deg)"
                }
            },
            deliveryStyle() {
                return {
                    "background-color": "#" + this.restaurant.delivery_mode.color,
                    color: "#" + this.restaurant.delivery_mode.text_color,
                }
            },
            isMode() {
                if (this.restaurant.delivery_mode) {
                    return true;
                }
                return false;
            }
        },

        components: {
            star,
            activity
        },
        filters: {
            distanceDecration(v) {
                if (v > 1000) {
                    return (v / 1000).toFixed(2) + "km"
                }
                return v + "m"
            },
            timeDecration(v) {
                if (v > 60) {
                    return Math.floor(v / 60) + "小时" + (v - Math.floor(v / 60) * 60) + "分钟"
                }
                return v + "分钟"
            }
        },
    }
</script>


<style scoped>
    .res-root {
        /* height: 15vh; */
        padding: 3vw;
        /* height: 20vh; */
        /* border: violet 1px solid; */
        border-bottom: 1px solid rgb(240, 240, 240);
    }

    .res-info {
        /* border: 1px saddlebrown solid; */
        display: flex;
        justify-content: flex-start;
        /* align-items: center; */
    }

    .res-info-right {
        margin-left: 1vw;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .image-box {
        position: relative;
    }

    .new-res-bgc {
        position: absolute;
        /* border: #644f1b 1px solid; */
        background-image: linear-gradient(135deg, #26ce61, #26ce61 50%, transparent 0);
        transform: translate(-1px, -1px);
        width: 8vw;
        height: 8vw;
    }

    .new-res-title {
        display: block;
        font-size: 1vw;
        font-weight: 700;
        transform: rotate(-45deg) scale(0.8, 0.8);
        transform-origin: 45% 75%;
        color: white;
    }

    .res-img {
        width: 16vw;
        border: solid 1px #ccc;
    }

    .res-img-c {
        width: 16vw;
    }

    .res-info-detail {
        /* border: 1px saddlebrown solid; */
        display: flex;
        justify-content: space-between;
        flex-grow: 1;
        height: 33.33%;
    }

    .brand {
        display: inline-block;
        font-size: 1vw;
        font-weight: 700;
        color: #644f1b;
        background-color: rgb(255, 239, 8);
        padding: 1px 2px;
        border-radius: 4px;
    }

    .res-name {
        display: inline-block;
        font-weight: 700;
        font-size: 4vw;
    }

    .showMore {
        display: inline-block;
        color: #999;
        padding: 1px 2px;
    }

    .rate {
        position: relative;
        display: flex;
        align-items: center;
        font-size: 1vw;
        color: #666;
        height: 33.33%;
    }

    .rateHolder {
        color: transparent;
    }

    .delivery-mode {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%) scale(0.8,0.8);
        padding: 1px;
        border-radius: 2px;
    }

    .res-delivery {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1vw;
        color: #666;
        height: 33.33%;
    }



    .res-delivery-distance {
        color: #999;
    }

    .holder {
        color: #ccc;
        display: inline-block;
        padding: 0 2px;
    }


    .res-info-special {
        margin-left: 1vw;
        flex-grow: 1;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .res-info-special-item {
        box-shadow: 1px 1px 1px #ccc;
        color: #666;
        font-size: 1vw;
        margin-left: 2vw;
        margin-top: .8vh;
    }

    .res-info-activity {
        position: relative;
        /* border: 1px orange solid; */
        box-sizing: border-box;
        flex-grow: 1;
        margin-left: 1vw;
        margin-top: 1.2vh;
    }

    .activities-indicator {
        position: absolute;
        top: .6vh;
        right: 0;
        color: #999;
        font-size: 1vw;
    }

    .narrow {
        display: inline-block;
        transition: all .3s;
    }
</style>