import React from 'react';
import './App.css';


import {
    HashRouter,
    Route,
    Redirect
} from "react-router-dom";

import Login from "./views/Login/Login.jsx";
import Home from "./views/Home/Home.jsx";

import {Spin} from "antd";

import {connect} from "react-redux";

class App extends React.Component{
    render(){
        return (
            <div>
    
                <Spin spinning={this.props.isLoading}>
                    <HashRouter>
                        <Route exact path="/login" component={Login}></Route>
    
                        <Route 
                            path="/home" 
                            component={Home}
                        ></Route>

                        <Route exact path="/">
                            <Redirect to="/home/cate-list"></Redirect>
                        </Route>
    
                    </HashRouter>
                </Spin>
                
    
            </div>
        ); 
    }
}

function mapState(state){
    return {
        isLoading:state.isLoading
    }
}

App = connect(mapState)(App);


export default App;
