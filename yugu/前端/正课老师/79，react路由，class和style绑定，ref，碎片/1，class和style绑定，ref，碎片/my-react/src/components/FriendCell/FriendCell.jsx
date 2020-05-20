
import React, { Fragment } from "react";
import "./FriendCell.css";

class FriendCell extends React.Component{
    render(){
        return (
            <div>
                <div>
                    {/* 标签内容传值的数据可以直接渲染到模板中 */}
                    {this.props.children[0]}
                </div>
                <div>
                    {this.props.children[1]}
                </div>


                {/* react中可以使用 [...Array(3)] 实现固定次数的循环*/}
                {[...Array(3)].map((el,i)=>
                    (   
                        // Fragment组件用于编写一段html片段，类似vue的template标签，在页面渲染时不会被渲染
                        <Fragment key={i}>
                            <label htmlFor="">第{i}行</label>
                            <input type="text"/>
                        </Fragment>
                    )
                )}

            </div>
        )
    }

    constructor(props){
        super(props);

        // 通过标签内容传的值会存储在组件对象.props.children中(所以通过属性传值时属性名不能叫children)，
        // 如果内容是单个标签则children就是一个react元素对象，如果内容是多个标签children是一个数组，数组中
        // 存放多个react元素对象。
        // console.log(this.props);
    }
}

export default FriendCell;
