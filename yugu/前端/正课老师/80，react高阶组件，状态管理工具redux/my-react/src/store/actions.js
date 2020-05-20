
import axios from "axios";


// 修改仓库中的数据，需要提交action，action是一个对象，但是redux中每次提交的action不能是同一个对象，所以需要将action写成一个工厂函数，
// 返回action对象
function numIncrease(){
    return {
        type:"NUM_INCREASE",
    }
}

// 对于赋值类型的修改，action对象中要有value属性
function setStr(v){
    return {
        type:"SET_STR",
        value:v
    }
}

function setObj(v){
    return {
        type:"SET_OBJ",
        value:v
    }
}

// 使用了thunk之后，action也可以是一个函数，函数中进行异步任务，异步任务结束后再通过同步action进行数据修改。
function queryObj(params){
    return function(dispatch){
        return axios.get("/data2.json")
        .then(res=>{
            dispatch(setObj(res.data));
            return Promise.resolve(res);
        });
    }
}


export {
    numIncrease,
    setStr,
    setObj,
    queryObj
}