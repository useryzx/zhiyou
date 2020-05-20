
import React from "react";
import "./Home.css";
import withUserBehavior from '../../HOC/withUserBehavior.jsx'
class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>首页</h1>
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.state = {

        }
        this.enterTime = undefined;
    }
    // componentDidMount() {
    //     console.log("用户进入了首页");
    //     this.enterTime = Date.now();
    // }
    // componentWillUnmount() {
    //     let leaveTime = Date.now();
    //     let t = leaveTime - this.enterTime;
    //     t=Math.floor(t/1000)
    //     console.log("用户离开了首页,一共停留了"+t+"秒"); 
    // }
}
//高阶组件的本质不是一个组件，而是一个函数，这个函数接收一个待扩展的组件A，然后函数内部创建一个新的组件B，组件B的模板内容是组件A（组件A被组件B包裹）。我们可以再组件B中进行功能扩充，最后返回B组件，这样就实现了在组件A添加组件B提供的功能。
//高阶组件实现逻辑复用，把需要复用的逻辑写在高阶组件中，这样高阶组件函数就可以任何组件进行扩充。
Home = withUserBehavior(Home);
export default Home;
