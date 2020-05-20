import React from 'react';
import './App.css';

import {
  HashRouter,
  Route,
  Switch,
  Link
} from 'react-router-dom'

import Home from './views/Home/Home.jsx'
import Setting from './views/Setting/Setting.jsx'
import User from './views/User/User.jsx'
import First from './views/First/First';
import Second from './views/Second/Second';

function App() {
  return (
    <div>
      <HashRouter>
        <p>
          <Link to="/" className="App-nav-item">首页</Link>
          <Link to="/setting" className="App-nav-item">设置</Link>
          <Link to="/user" className="App-nav-item">用户</Link>
          <Link to="/first" className="App-nav-item">first</Link>
          <Link to="/second" className="App-nav-item">second</Link>
        </p>

        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/setting" component={Setting}></Route>
          <Route exact path="/user" component={User}></Route>
          <Route exact path="/first" component={First}></Route>
          <Route exact path="/second" component={Second}></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
