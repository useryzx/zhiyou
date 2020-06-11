
import React from "react";

import { connect } from "react-redux";

import { 
    queryIsLogin ,
    queryLogout
} from "../../store/asyncAction.js";

import keyToPageMap from "./keyToPageMap.js";

export default function(WrappedComponent){
    class HomeHoc extends React.Component{
        render(){
            if(!this.props.userInfo){
                return "";
            }
            return (
                <WrappedComponent
                    {...this.props}
                    {...this.state}
                    checkLogin={this.checkLogin}
                    toggleCollapsed={this.toggleCollapsed}
                    registRouteListener={this.registRouteListener}
                    calcTabsKey={this.calcTabsKey}
                    tabsChange={this.tabsChange}
                    tabsClose={this.tabsClose}
                ></WrappedComponent>
            )
        }

        constructor(props) {
            super(props);
            this.state = {
                isCollapse: false,
                // 已经打开的tabs页面
                openedPages: [
                    // { key: "category0", title: "查看分类",page:xxx },
                ]
            }
    
            this.bindAll([
                "checkLogin",
                "toggleCollapsed", 
                "registRouteListener",
                "calcTabsKey",
                "tabsChange",
                "tabsClose"
            ]);
        }

        componentDidMount() {
            // console.log("homeHoc mount");

            this.checkLogin()
            
        }

        componentWillUnmount(){
            // console.log("homeHoc unmount");
        }
    
        registRouteListener(){
            this.props.history.listen(this.calcTabsKey);
        }
    
        calcTabsKey(r){
            // console.log(this.props);
            // console.log(r);
            
            let key = r.pathname + r.search;
            let hasOpened = this.state.openedPages.some(el=>{
                return el.key === key
            });
            if(!hasOpened){
                // this.state.openedPages.push({key:key,title:keyToTitleMap[key]});
                let page = keyToPageMap(key);
                if(page){
                    if(r.state&&r.state.name){
                        page.name = r.state.name;
                    }
                    this.state.openedPages.push(page);
                }
                
                this.setState({
                    openedPages:this.state.openedPages
                });
            }
        }
    
        checkLogin() {
            if (!this.props.userInfo) {
                this.props.queryIsLogin()
                .then(res => {
                    
                    if (res.data.err) {
                        // console.log(this.props.history);
                        
                        this.props.history.replace("/login");
                        
                    }else{
                        // console.log(123);
                        this.registRouteListener();
                        this.calcTabsKey(this.props.location);
                    }
                });
            }else{
                this.registRouteListener();
                this.calcTabsKey(this.props.location);
            }
        }
        toggleCollapsed() {
            this.setState({
                isCollapse: !this.state.isCollapse
            });
        }
    
    
        tabsChange(e){
            // console.log(e);
            this.props.history.push(e);
        }
    
        tabsClose(e){
            
            let index = this.state.openedPages.findIndex(el=>{
                return el.key === e;
            });
            
            console.log(index);
    
            let tempArr = this.state.openedPages.slice();
    
            tempArr.splice(index,1);
            
            if(tempArr.length<=0){
                this.props.history.push("/home");
            }else{
                
                if(e === this.props.location.pathname + this.props.location.search){
                    this.props.history.push(tempArr[0].key);
                }
            }
    
            this.setState({
                openedPages:tempArr
            });
            
        }
    }

    function mapState(state) {
        return {
            userInfo: state.userInfo
        }
    }
    
    function mapAction(dispatch, ownProps) {
    
        return {
            queryIsLogin(params) {
                return dispatch(queryIsLogin(params));
            },
            
            queryLogout(params) {
                return dispatch(queryLogout(params));
            }
        }
    }
    
    HomeHoc = connect(mapState, mapAction)(HomeHoc);

    return HomeHoc;

}