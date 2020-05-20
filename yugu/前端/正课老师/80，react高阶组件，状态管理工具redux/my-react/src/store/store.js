import {createStore,applyMiddleware} from "redux";

import reducer from "./reducer.js"

// thunk是redux的插件，可以实现异步数据修改。
import thunk from "redux-thunk";

// createStore创建仓库对象。第一个参数是reducer函数，reducer函数中决定仓库中都有哪些数据。
const store = createStore(reducer,applyMiddleware(thunk));



export default store;