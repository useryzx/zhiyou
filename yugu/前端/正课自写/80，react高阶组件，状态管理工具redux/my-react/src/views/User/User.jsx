
import React from "react";
import "./User.css";
import withFetchData from '../../HOC/withFetchData.jsx'
// 在组件中使用仓库数据时，需要先导入react-redux中的connect函数

import { connect } from 'react-redux'
// 导入本组件需要使用的action工厂函数
import { numIncrease, setStr, queryObj } from '../../store/action.js'
class User extends React.Component {
	render() {
		return (
			<div>
				<h1>用户界面</h1>
				{this.props.data && <p>{this.props.data.msg}</p>}
				<p>{this.props.num}</p>
				<button onClick={this.props.increase}>+</button>
				<p>{this.props.str}</p>
				<input type="text" value={this.props.str} onChange={this.strChange} />
				<p>{this.props.obj.msg}</p>
			</div>
		)
	}

	constructor(props) {
		super(props);
		this.bindAll(['strChange'])
	}
	componentDidMount() {
		console.log(this);
		this.props.queryObj()
		.then(res=>{
			console.log(res.data);
			
		})
	}
	strChange(e) {
		let t = e.target.value;
		console.log(t);

		this.props.setStr(t)
	}
}
// User = withFetchData(User, "data2.json");
// 设置从仓库拿的数据
function mapState(state) {
	return {
		num: state.num,
		str: state.str,
		obj: state.obj
	}
}
//修改仓库中的数据需要提交action对象，action对象的创建应该由action的工厂函数完成。mapAction函数中设置本组件需要使用的action都有哪些

function mapAction(dispatch, ownProps) {
	return {
		increase() {
			// dispatch参数是一个函数，用于提交action
			dispatch(numIncrease())
		},
		setStr(v) {
			dispatch(setStr(v))
		},
		queryObj() {
			return dispatch(queryObj())
		}
	}
}
User = connect(mapState, mapAction)(User)
export default User;
