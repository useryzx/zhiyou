<template>
    <div class="root" @click="rootClick">

        <div id="mask" v-show="maskIndex==index" @click="closeMask">
            <div id="mask-btn">不喜欢</div>
        </div>

        <div class="left">
            <img :src="imgFilter(rest.image_path)" class="rest-img">
        </div>
        
        <div class="right">
            <!-- 1 -->
            <div class="first-line between">
                <div class="first-left">
                    <span class="brand-title" v-if="rest.brand_id">品牌</span>
                    <span class="rest-name">{{rest.name}}</span>
                </div>
                <div @click="openMask">...</div>
            </div>
            <!-- 2 -->
            <div class="second-line between">
                <div class="second-left">
                    <van-rate 
                        v-model="rest.rating" 
                        readonly 
                        :size="10" 
                        :gutter="1" 
                        :allow-half="true"
                    ></van-rate>
                    <span class="before-space">{{rest.rating}}</span>
                    <span class="before-space">月售{{rest.recent_order_num}}单</span>
                </div>
                <div>
                    <span 
                        v-if="rest.delivery_mode" 
                        class="delivery-item"
                        :style="deliveryStyleObj"
                    >
                        {{rest.delivery_mode.text}}
                    </span>
                </div>
            </div>
            <!-- 3 -->
            <div class="third-line between">
                <div>
                    <span>￥{{rest.float_minimum_order_amount}}起送</span>
                    <span class="seperate">|</span>
                    <span>{{rest.piecewise_agent_fee.description}}</span>
                </div>
                <div class="third-right">
                    <span>{{rest.distance|distanceFilter}}</span>
                    <span class="seperate">|</span>
                    <span>{{rest.order_lead_time}}分钟</span>
                </div>
            </div>
            <!-- 4 -->
            <div class="fourth-line">
                <div class="flavor-item" v-for="f in rest.flavors">{{f.name}}</div>
            </div>

            <!-- 5 -->
            <div class="fifth-line" :class="{'fifth-line-close':isClose}">
                <div
                    class="open-btn" 
                    v-if="allActivies.length>2"
                    @click.stop="isClose = !isClose"
                >
                    {{allActivies.length}}个活动
                    <van-icon class="open-icon" name="arrow-down" :style="openBtnStyleObj"/>
                </div>
                <div class="activity-item" v-for="a in allActivies">
                    <div 
                        class="activity-item-name"
                        :style="{'background-color':'#'+a.icon_color}"
                    >{{a.icon_name}}</div>
                    <div class="activity-item-des" :style="{width:allActivies.length>2?'60vw':'75vw'}">{{a.description}}</div>
                </div>
            </div>


        </div>
    </div>
</template>


<script>
import imgFilter from "@/util/imgFilter.js";
import distanceFilter from "@/util/distanceFilter.js";
import {mapState,mapMutations} from "vuex";

export default {
    data(){
        return {
            isClose:true,
        }
    },
    props:["rest","index"],
    filters:{
        distanceFilter
    },
    methods: {
        ...mapMutations(["setMaskIndex"]),
        imgFilter,
        openMask(){
            this.setMaskIndex(this.index);
        },
        closeMask(){
            this.setMaskIndex(-1);
        },

        rootClick(){
            this.$router.push("/home/rest-detail?id="+this.rest.id);
        }
    },
    mounted() {
        // console.log(this.rest);
    },
    computed: {
        ...mapState(["maskIndex"]),
        deliveryStyleObj(){
            let o = {};
            if(this.rest.delivery_mode){
                o.background = `linear-gradient(135deg,#${this.rest.delivery_mode.gradient.rgb_from},#${this.rest.delivery_mode.gradient.rgb_to})`
                console.log(o);
            }
            return o;
        },
        openBtnStyleObj(){
            let ang = this.isClose?0:180;
            return {
                transform: `rotate(${ang}deg)`
            }
        },
        allActivies(){
            return [...this.rest.activities,...this.rest.supports];
        }
    },
}
</script>


<style scoped>
    .root{
        display: flex;
        border-bottom: solid 1px #eeeeee;
        
    }

    .before-space{
        margin-left: 4px;
    }

    .left{
        width: 20%;
        /* background-color: aqua; */
        text-align: center;
    }

    .right{
        width: 80%;
    }

    .rest-img{
        width: 60px;
        height: 60px;
        margin-top: 20px;

    }

    .between{
        display: flex;
        justify-content: space-between;
        padding-right: 10px;
        align-items: center;
    }

    .first-line{
        margin-top: 20px;
    }

    .first-left{
        /* width: 70%; */
        white-space: nowrap;
    }

    .brand-title{
        color: #6f3f15;
        background: linear-gradient(-139deg,#fff100,#ffe339);
        font-size: 12px;
        font-weight: bold;
        padding: 2px 4px;
        display: inline-block;
        border-radius: 2px;
        margin-right: 4px;
        vertical-align: middle;
    }

    .rest-name{
        font-weight: bold;
        color: #333;
        width: 60vw;
        display: inline-block;
        vertical-align: middle;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .second-line{
        margin-top: 8px;
    }

    .second-left{
        font-size: 12px;
        color: #666;
    }

    .delivery-item{
        color: white;
        font-size: 10px;
        padding: 1px;
        border-radius: 2px;
    }

    .third-line{
        font-size: 12px;
        color: #666;
    }
    .third-right{
        color: #999;
    }

    .seperate{
        margin: 0 2px;
        color: #999;
    }

    .fourth-line{
        display: flex;
        margin-top: 10px;
    }

    .flavor-item{
        font-size: 10px;
        color: #ccc;
        margin-right: 10px;

    }

    .fifth-line{
        
        /* background-color: aquamarine; */
        overflow: hidden;
        margin-bottom: 20px;
        position: relative;
    }

    .fifth-line-close{
        height: 40px;
    }

    .activity-item{
        display: flex;
        font-size: 12px;
        margin: 4px 0;
    }

    .activity-item-name{
        background-color: #ffe339;
        color: white;
        padding:1px 2px;
        border-radius: 2px;
        margin-right: 4px;
        font-size: 10px;
    }

    .activity-item-des{
        width: 75vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #999;
    }

    .open-btn{
        font-size: 10px;
        color: #999;
        position: absolute;
        right: 10px;
        top: 5px;
    }

    .open-icon{
        display: inline-block;
        transition: all 0.3s;
    }

    .root{
        position: relative;
    }

    #mask{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 5;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #mask-btn{
        background-color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;

    }
</style>