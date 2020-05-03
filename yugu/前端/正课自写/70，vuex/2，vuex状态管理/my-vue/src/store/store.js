import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// 注册插件
Vue.use(Vuex);
// 创建仓库对象
const store = new Vuex.Store({
    // 仓库中的状态（数据）
    state: {
        num: 99,
        str: "hello",
        arr: ["a", "b", "c"],
        data: {}
    },
    // 仓库数据的衍生数据，类似组件的计算结果
    getters: {
        greed(state) {
            return state.str + "world"
        }
    },
    // 仓库数据的   同步  修改方法
    mutations: {
        // 仓库中某数据的mutations命名规则一般为setXxx
        setNum(state, v) {
            state.num = v;
        },
        setData(state, v) {
            state.data = v;
        },
    },
    // 仓库数据的异步修改方法
    actions: {
        // 异步数据修改一般都用于网络请求，参数一般也作为网络请求的参数
        queryData(store, v) {
            return axios.get("/data.json").then(res => {
                // 异步任务得到数据之后要通过提交mutations的形式修改
                store.commit("setData",res.data)
                return Promise.resolve(res)
            })
        }
    }
})
export default store;