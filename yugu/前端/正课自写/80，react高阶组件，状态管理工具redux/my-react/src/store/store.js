import {createStore,applyMiddleware} from 'redux'
// 创建仓库对象
import reducer from './reducer.js'
// thunk是redux插件，可以实现异步数据修改
import thunk from 'redux-thunk';
const store = createStore(reducer,applyMiddleware(thunk));

export default store;