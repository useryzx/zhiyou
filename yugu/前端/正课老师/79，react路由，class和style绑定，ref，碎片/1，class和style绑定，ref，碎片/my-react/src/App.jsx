import React from 'react';
import './App.css';

import MyCom from "./components/MyCom/MyCom.jsx";
import RefTest from "./components/RefTest/RefTest.jsx";
import FriendCell from "./components/FriendCell/FriendCell.jsx";

function App() {
    return (
        <div>
            <MyCom></MyCom>
            <hr/>
            <RefTest></RefTest>
            <hr/>

            {/* react组件出了可以通过标签属性传值，也可以通过标签内容传值。 */}
            <FriendCell>
                <h1>张三</h1>
                <p>你好，能借我点钱吗？</p>
            </FriendCell>
        </div>
    );
}

export default App;
