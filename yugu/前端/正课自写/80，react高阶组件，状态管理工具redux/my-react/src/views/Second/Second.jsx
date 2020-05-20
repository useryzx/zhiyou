import React from 'react'
import SecondHOC from './SecondHOC.jsx'
//高阶组件还可以对组件实现视图和逻辑的分离。
//使用普通的函数组件实现组件的视图部分（组件模板），使用高阶组件实现组件的逻辑部分（数据和方法）。
//然后在函数组件中导入高阶组件并合并。
//将组件进行视图逻辑分层，有利于组件的扩展和维护。
function Second(props){
    return(
        <div>
            <p>{props.num}</p>
            <input type="text" value={props.num} onChange={props.numChange}/>
            <button onClick={props.numMinus}>-</button>
            <button onClick={props.numIncrease}>+</button>
        </div>
    )
}
Second = SecondHOC(Second)
export default Second;