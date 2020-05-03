// vue组件使用的混入项对象中添加的字段和vue组件配置对像中的字段一致，可以认为混入对象是组件配置对像中的某一部分
export default {
    data() {
        return {
            isLoading: false,
        }
    },
    methods: {
        onPageScoll() {
            console.log("页面滚动了")
        },
        queryData() {
            console.log("请求数据")
            this.axios.get(this.url)
                .then(res => {
                    
                })
        },
        // 如果组件中和混入项中有相同名字的方法，则此方法不会混入覆盖
        m1() {
            console.log("混入项中的m1方法");

        }
    },
    // 混入项对象中可以使用生命周期钩子函数，混入组件时，不会覆盖组件的原生命周期钩子函数，而是会进行逻辑合并
    mounted() {
        console.log("这是混入项中的mounted")
    },

}