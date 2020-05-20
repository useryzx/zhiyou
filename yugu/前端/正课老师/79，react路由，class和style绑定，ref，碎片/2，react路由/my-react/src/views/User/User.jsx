
import React from "react";
import "./User.css";

class User extends React.Component{
    render(){
        return (
            <div>
                <p>用户页面</p>
                <button onClick={e=>{
                    this.props.history.goBack()
                }}>后退</button>
                
            </div>
        )
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props.location.search);
        let search = this.props.location.search;
        search = search.substr(1);
        let query = this.qs.parse(search);
        console.log(query);
    }
}

export default User;
