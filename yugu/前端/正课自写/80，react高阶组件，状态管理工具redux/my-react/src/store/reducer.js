// reducer函数用于设置仓库中的数据（状态）,函数需要返回仓库数据对象，每当访问（写）（提交action时）仓库中的数据时，reducer函数就会被调用，函数所返回的数据就是修改后的数据
// function reducer(state = {
//     num: 99,
//     str: 'hello',
//     flag: false,
//     obj: {
//         k1: "v1"
//     }
// }, action) {
//     //reducer函数的第一个参数state是仓库数据的当前状态，第一次调用reducer函数时获得的是state是个空对象（因为仓库初始状态没有任何数据）
//     //所以可以通过为state设置默认值来设置仓库中数据的初始状态
//     // state = state||{
//     //     num:99,
//     //     str:'hello'
//     // }
//     // 第二个参数是本次数据修改的action
//     switch (action.type) {
//         case "NUM_INCREASE":
//             return Object.assign({}, state, {
//                 num: state.num + 1
//             })
//             break;
//         case "SET_STR":
//             return Object.assign({}, state, {
//                 str: action.value
//             })
//             break;
//         default:
//             break;
//     }
//     return state;
// }
// 一次性把所有的state写在一个reducer函数中，会导致reducer函数过大，不利于维护，可以将不同的state写成独立的state数据
import { combineReducers } from "redux";
function num(state = 99, action) {
    if (action.type === 'NUM_INCREASE') {
        return state + 1;
    }
    return state
}

function str(state='hello',action) {
    if(action.type==='SET_STR'){
        return action.value
    }
    return state;
}
function obj(state={
    k1:'v1',
    k2:'v2'
},action) {
    if (action.type === 'SET_OBJ') {
        return action.value
    }
    return state;
}
const reducer = combineReducers({
    num,
    str,
    obj
})
export default reducer;