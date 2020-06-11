
import React from "react";
import "./CateEdit.css";


import { connect } from "react-redux";
import { 
    queryCategory
    
} from "../../store/asyncAction.js";

import qs from "qs";

class CateEdit extends React.Component{
    render(){
        return (
            <div>
                <h3>编辑分类</h3>

            </div>
        )
    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log(this.props);
        let search = this.props.location.pathname.split("?")[1];
        console.log(qs.parse(search));

        let _id = qs.parse(search)._id;
        console.log(_id);

        this.props.queryCategory({
            _id:_id
        })
        .then(res=>{
            console.log(res);
        })
    }
}

function mapState(state) {
    return {
        
    }
}
function mapAction(dispatch, ownProps) {

    return {
        queryCategory(params) {
            return dispatch(queryCategory(params));
        }
    }
}
CateEdit = connect(mapState, mapAction)(CateEdit);

export default CateEdit;
