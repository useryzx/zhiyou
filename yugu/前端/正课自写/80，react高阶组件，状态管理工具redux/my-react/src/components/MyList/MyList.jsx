
import React from "react";
import "./MyList.css";

class MyList extends React.Component{
    render(){
        return (
            <div>
                <input type="checkbox" checked={this.state.show} onChange={e=>{
                    this.setState({
                        show:e.target.checked
                    })
                }}/>
                {/* react组件模板中，不能直接绑定布尔值 */}
                {/* <p>{this.state.show}</p> */}

                {/* react中使用 && 实现条件渲染 */}
                {this.state.show&&<p>条件渲染</p>}

                {/* 也可以使用三目运算符实现条件渲染 */}
                {this.state.show?<p>真</p>:<p>假</p>}


                <table>
                    <tr>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>在线状态</th>
                    </tr>

                    {/* react组件中使用数组的map方法实现列表渲染 */}
                    {this.state.list.map(el=>(
                            <tr>
                                <td>{el.name}</td>
                                <td>{el.age}</td>
                                <td>{el.online?"在线":"离线"}</td>
                            </tr>
                        )
                    )}
                </table>

                
            </div>
        )
    }

    constructor(props){
        super(props);

        this.state = {
            show:true,

            list:[
                {id:1,name:"王五",age:20,online:true},
                {id:1,name:"李磊",age:50,online:true},
                {id:1,name:"韩梅梅",age:33,online:false},
            ]
        }
    }
}

export default MyList;

// &&  前者为真取后者，前者为假取前者
// console.log(0&&10);
// console.log(1&&10);
// console.log(10&&10);

// ||  前者为真取前者，前者为假取后者
// console.log(0||10);
// console.log(1||10);
// console.log(10||10);



