import React from 'react';
import './App.css';

// history,hash

// react路由和vue路由一样，支持两种路由模式，history(BrowserRouter)模式和hash(HashRouter)模式
import {
    Route,
    HashRouter,
    // BrowserRouter,
    Link,
    Switch,
    Redirect
} from "react-router-dom";


import Home from "./views/Home/Home.jsx";
import Setting from "./views/Setting/Setting.jsx";
import User from "./views/User/User.jsx";

function App() {
    return (
        <div>
            {/* 路由视图，匹配到的页面级组件会显示在HashRouter中，相当于vue路由中的router-view */}
            <HashRouter>
                <ul>
                    <li>
                        {/* Link组件，路由链接组件，实现路由跳转，相当于vue路由中的router-link */}
                        <Link to="/">首页</Link>
                    </li>
                    <li>
                        <Link to="/setting/100">设置</Link>
                    </li>
                    <li>
                        {/* 页面跳转传参可以使用路径传参，也可以使用query传参 */}
                        <Link to="/user?name=张三&age=12">用户</Link>
                    </li>
                    <li>
                        <Link to="/user/list">用户二级页面</Link>
                    </li>
                </ul>

                {/* react路由的路由视图默认可以同时匹配多个页面，将路由负责放在Switch组件中可以
                保证只匹配其中一个页面 */}
                <Switch>
                    {/* Route标签，用于设置路由规则，path属性是路由路径，component属性是这个路径对应的页
                    面级组件，exact属性设置这条路由规则为精准匹配。 */}
                    <Route exact path="/home" component={Home}></Route>
                    {/* 可以在路径中添加传参路径 /:xxxx */}
                    <Route exact path="/setting/:id" component={Setting}></Route>


                    {/* react路由中没有类似vue的路由守卫功能，可以在Route组件的render函数中进行跳转的
                    逻辑判断 */}
                    <Route exact path="/user" render={props=>{
                        console.log("进入用户页面了");
                        return (
                            <User {...props}></User>
                        )
                    }}></Route>



                    {/* 路由规则可以指定匹配的页面组件，也可以设置匹配的内容 */}
                    <Route exact path="/user/list">
                        <p>我是用户页面的二级页面</p> 
                    </Route>
                    
                    {/* 使用Redirect组件实现重定向 */}
                    <Route exact path="/">
                        <Redirect to="/home"></Redirect>
                    </Route>

                    {/* 如果Route不设置path，则可以匹配到所有路径 */}
                    <Route>
                        <h3>404 Not Found</h3>
                    </Route>

                    {/* {arr.map(el=>
                        (
                            <Route exact path={el.path} component={el.component}></Route>
                        )
                    )} */}

                </Switch>

                


            </HashRouter>

            
            

        </div>
    );
}

export default App;
