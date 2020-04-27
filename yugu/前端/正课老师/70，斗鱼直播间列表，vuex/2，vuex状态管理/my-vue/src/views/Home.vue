<template>
    <div>
        <h1>首页</h1>
        <p>
            <button>-</button>
            <span>num:{{num}}</span>
            <button @click="addClick">+</button>
        </p>
        <p>str:{{str}}</p>

        <p>{{greed}}</p>

        <p>{{data.err}}={{data.msg}}</p>
    </div>
</template>


<script>

import {
    mapState,
    mapGetters,
    mapMutations,
    mapActions
} from "vuex";

export default {
    data(){
        return {

        }
    },

    mounted() {
        // 组件对象中可以访问到仓库对象，但是不要通过store对象访问store中的数据。
        // console.log(this.$store);

        // 如果调用仓库中的action时需要得到异步任务的promise，那么仓库中的action方法必须返回异步任务的promise
        this.queryData()
        .then(res=>{
            console.log(res);
        })

    },

    // 在组件中使用store的数据，需要在组件的computed中添加一个同名(也可以不同命)的方法，在方法中返回store中的这条数据。
    // computed: {
    //     num(){
    //         return this.$store.state.num;
    //     },
    //     str(){
    //         return this.$store.state.str;
    //     }
    // },
    
    // 使用vuex中提供的mapState函数，可以快速生成映射数据的computed
    // computed: mapState(["num","str"]),


    // computed: Object.assign(mapState(["num","str"]),{
    //     myComputed(){
    //         return "这是组件自己的compued"
    //     }
    // }),
    
    // 展开运算符，
    computed: {
        ...mapState(["num","str","data"]),
        ...mapGetters(["greed"]),
        myComputed(){
            return "这是组件自己的compued"
        }
    },

    // mapMutations可以把仓库中的数据修改方法映射到组件中
    methods: {
        ...mapMutations(["setNum"]),
        ...mapActions(["queryData"]),
        addClick(){
            this.setNum(this.num+1);
        }
    },


}

// let arr = ["a","b",...["c","d"]];
// ["a","b","c","d"]

</script>


<style scoped>
    
</style>