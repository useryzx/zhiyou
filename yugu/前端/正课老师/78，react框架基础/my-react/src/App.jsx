import React from 'react';
// import logo from './logo.svg';
import './App.css';

// 使用组件时，导入组件的jsx文件就可以直接使用。
import MyCom from "./components/MyCom/MyCom.jsx";
import NumCtrl from "./components/NumCtrl/NumCtrl.jsx";
import MyList from "./components/MyList/MyList.jsx";

// // react中，一个组件的数据类型可以是一个函数，函数中返回组件的模板。这种组件叫做函数组件。
// function App() {
// 	// 组件的模板只能有一个根标签。
// 	return (
// 		// 在jsx语法中，class用于声明一个类，所以在标签中设置class要使用className
// 		<div className="App">
// 			<MyCom 
// 				str="abc123" 
// 				// jsx中，html中可以通过{}嵌入js代码，表达式的值会被渲染到html中
// 				num={123}
// 			></MyCom>

// 			<NumCtrl></NumCtrl>
// 		</div>
// 	);
// }
// export default App;

import currencyFilter from "./utils/currencyFilter.js";

class App extends React.Component{
	
	render(){
		return (
			<div className="App">
				<MyCom 
					str="abc123" 
					// jsx中，html中可以通过{}嵌入js代码，表达式的值会被渲染到html中
					num={123}
				></MyCom>

				<hr/>

				<div>
					<p>{this.state.num}</p>
					<input value={this.state.num} onChange={this.numChange}/>
				</div>

				<hr/>

				<NumCtrl
					value={this.state.num}
					setNum={this.setNum}
				></NumCtrl>

				{/* react中没有类似vue的计算结果，页面中绑定衍生数据时需要绑定方法调用 */}
				<p>{this.fullName()}</p>

				{/* react组件的模板中绑定的方法或方法调用不一定是组件的方法 */}
				<p>{currencyFilter(this.state.price)}</p>

				<hr/>
				<MyList></MyList>
				
			</div>
		)
	}

	constructor(){
		super();
		this.state = {
			num:50,
			str:"abc",
			firstName:"三",
			familyName:"张",
			price:99
		}

		this.numChange = this.numChange.bind(this);
		this.setNum = this.setNum.bind(this);
		this.fullName = this.fullName.bind(this);


		// this.xxxxx(["numChange","aaaaa"]);
	}

	// numChange = e=>{
	// 	console.log(this);
	// }

	// 默认情况下，由于组件的方法是绑定到了事件系统上，而不是通过组件对象直接调用，所以组件方法中的this不是
	//组件对象。 如果要在组件方法中使用组件对象作为this，那么可以在绑定事件时 bind(this)，或者在构造函数中
	//把组件方法覆盖成bind(this)版的方法，或者声明组件方法时使用箭头函数。
	numChange(e){
		// console.log(e.target.value);
		console.log(this);

		// react组件的数据不能直接修改，否则页面不会渲染。
		// this.state.num = e.target.value*1;

		// 使用this.setState进行数据修改
		this.setState({
			num:e.target.value*1
		});
		
	}

	setNum(v){
		this.setState({
			num:v
		});
	}

	fullName(){
		return this.state.firstName + this.state.familyName;
	}

	// 生命周期钩子方法；
	// 组件创建并渲染完毕时调用。相当于vue的mounted
	componentDidMount(){

	}
	// 组件已经更新时调用 ,相当于vue的updated
	componentDidUpdate(){

	}
	// 组件将要受到传值时或传值发生变化时调用
	// componentWillReceiveProps(){

	// }
	
	// 组件将要卸载时调用，相当于vue的destroyed
	componentWillUnmount(){

	}




	
	
}

export default App;