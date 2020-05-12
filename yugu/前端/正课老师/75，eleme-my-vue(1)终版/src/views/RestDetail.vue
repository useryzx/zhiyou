<template>
    <div class="root">
        <div v-if="rst" id="top-box" :style="topBoxStyleObj">
            
        </div>
        <van-icon name="arrow-left" id="back-btn" @click="backClick"/>

        <div id="menu-box" >
            <div id="menu-left">
                <div 
                    v-for="c,i in menu" 
                    class="cate-item"
                    :class="{'cate-item-high':selectedCateIndex==i}"
                    @click="cateClick(i)"
                >
                    <img 
                        class="cate-item-img" 
                        v-if="c.icon_url&&selectedCateIndex==i" 
                        :src="imgFilter(c.icon_url,20,20)"
                    >
                    <img 
                        class="cate-item-img" 
                        v-if="c.grey_icon_url&&selectedCateIndex!=i" 
                        :src="imgFilter(c.grey_icon_url,20,20)"
                    >
                    <span class="cate-item-title">{{c.name}}</span>
                </div>
            </div>
            <div id="menu-right" ref="rightBox" @scroll="rightScroll">
                <div v-for="c in menu" ref="cates">
                    <div class="cate-title">
                        <span class="cate-title-name">{{c.name}}</span>
                        <span class="cate-title-des">{{c.description}}</span>
                    </div>
                    <div v-for="f in c.foods" class="food-item">
                        <div class="food-left">
                            <img class="food-img" :src="imgFilter(f.image_path,100,100)" >
                        </div>
                        <div class="food-right">
                            <div class="food-1">{{f.name}}</div>
                            <div class="food-2">{{f.description}}</div>
                            <div class="food-3">
                                <span v-if="f.month_sales">月售{{f.month_sales}}单</span>
                                <span v-if="f.satisfy_rate">好评率{{f.satisfy_rate}}%</span>
                            </div>
                            <div class="food-4">
                                <div class="f-price-label">
                                    <span>￥{{f.price}}</span>
                                    <small>
                                        <small v-if="f.specfoods.length>1">起</small>
                                    </small>
                                </div>
                                <div class="num-ctrl-box">
                                    <NumCtrl v-model="f.num"></NumCtrl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>


<script>
import imgFilter from "@/util/imgFilter.js";
import NumCtrl from "@/components/NumCtrl.vue"
export default {
    components:{
        NumCtrl
    },
    filters:{
        
    },
    data(){
        return {
            rst:null,
            menu:[],
            // cart:[],
            selectedCateIndex:0,
            cateBoxTop:[],
            isAnimation:false
        }
    },
    mounted() {
        
    },

    activated() {
        this.http.get("/restDetail.json")
        .then(res=>{
            console.log(res);
            res.data.menu.forEach(e1 => {
                e1.foods.forEach(e2=>{
                    e2.num = 0;
                })
            });

            this.rst = res.data.rst;
            this.menu = res.data.menu;
        })
    },

    updated() {
        this.calcHeight();
    },

    computed: {
        topBoxStyleObj(){
            return {
                "background-image":`url(${imgFilter(this.rst.shop_sign.image_hash,750,200)})`
            }
        }
    },

    methods: {
        backClick(){
            this.$router.back();
        },
        imgFilter,
        cateClick(i){
            this.selectedCateIndex=i;
            // console.log(i);

            // 不带动画
            // this.$refs.rightBox.scrollTop = this.cateBoxTop[i];

            // scrollTo动画效果
            // this.$refs.rightBox.scrollTo({
            //     top:this.cateBoxTop[i],
            //     left:0,
            //     behavior:"smooth"
            // });

            
            // js动画
            let from = this.$refs.rightBox.scrollTop;
            let to = this.cateBoxTop[i];
            let distance = to - from;
            // 速度，像素/帧
            let v = distance/20;
            
            let update = ()=>{
                this.$refs.rightBox.scrollTop += v;

                if(Math.abs(this.$refs.rightBox.scrollTop-to)<=Math.abs(v)){
                    this.$refs.rightBox.scrollTop = to;
                    this.isAnimation = false;
                }else{
                    requestAnimationFrame(update);
                }
            }
            this.isAnimation = true;
            update();

        },

        calcHeight(){
            // console.log(this.$refs.cates[1]);
            this.cateBoxTop = this.$refs.cates.map(e=>{
                return e.offsetTop;
            });
        },

        rightScroll(){
            if(this.isAnimation){
                return;
            }
            let st = this.$refs.rightBox.scrollTop;
            let index = null;
            for(let i = 0;i<this.cateBoxTop.length;i++){
                if(this.cateBoxTop[i]>st){
                    index = i-1;
                    break;
                }
            }
            
            this.selectedCateIndex = index;
        }
    },
}



// [0,150,400,500,750]

</script>


<style scoped>

    .root{
        position: relative;
        
    }
    #top-box{
        height: 100px;
        background-size: 100% 120%;
        background-position: center center;
        filter: brightness(0.8);
    }

    #back-btn{
        position: absolute;
        font-size: 30px;
        color: white;
        left: 10px;
        top: 10px;

    }

    #menu-box{
        display: flex;
        height: calc(100vh - 100px);
        margin-bottom: 50px;
    }

    #menu-left{
        width: 20%;
        /* background-color: antiquewhite; */
        overflow-y: scroll;
    }

    #menu-right{
        width: 80%;
        /* background-color: aqua; */
        overflow-y: scroll;
        position: relative;
    }

    .cate-item{
        font-size: 12px;
        padding: 12px 6px;
        background-color: #eeeeee;
    }

    .cate-item-high{
        background-color: #ffffff;
    }

    .cate-item-img{
        width: 14px;
        height: 14px;
    }

    .food-item{
        display: flex;
        padding: 10px 0;
    }

    .food-left{
        width: 25vw;
        text-align: center;
    }

    .food-right{
        width: 55vw;
    }

    .food-img{
        width: 80px;
        height: 80px;
        margin: 0 4px;
    }

    .food-1{
        font-weight: bold;
    }
    .food-2{
        font-size: 10px;
        color: #999;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 10px;
        margin: 6px 0;
    }
    .food-3{
        font-size: 10px;
        color: #999;
        padding-right: 10px;
        margin: 6px 0;
    }
    .food-4{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .f-price-label{
        color: rgb(255, 83, 57);
        font-size: 14px;
    }

    .num-ctrl-box{
        margin-right: 10px;
    }

    .cate-title{
        display: flex;
        align-items: center;
        padding: 8px 10px;
    }

    .cate-title-name{
        font-size: 12px;
        color: #666;
        margin-right: 10px;
        font-weight: bold;
    }
    .cate-title-des{
        font-size: 10px;
        color: #999;
    }

</style>