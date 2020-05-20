
//react模块是react框架的核心代码，其中包含了组件类和数据渲染的相关代码。
import React from 'react';
// react-dom模块是react在浏览器环境中运行的依赖模块，其中包含了将react组件和虚拟DOM以及真实DOM结合的代码。
// react除了可以和react-dom配合开发前端页面，还可以和react-native配合开发手机APP
import ReactDOM from 'react-dom';//React-Native

// 全局样式文件
import './index.css';

// 导入根组件。
import App from './App.jsx';


import * as serviceWorker from './serviceWorker';

// react开发，使用的不是js语法，而是jsx语法。
// jsx:一种js和html混用的语法。

// ReactDOM.render方法，把第一个参数的html内容渲染到第二个参数的DOM节点中。
ReactDOM.render(<App />,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
