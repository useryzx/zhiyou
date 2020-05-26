import React from 'react';
import './App.css';

import {
  HashRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { Spin } from 'antd'



import { connect } from 'react-redux'


import Login from './views/Login/Login.jsx'
import Home from './views/Home/Home.jsx'

class App extends React.Component {
  render() {
    return (
      <div>
        <Spin spinning={this.props.isLoading}>
          <HashRouter>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/" component={Home}></Route>
          </HashRouter>
        </Spin>
      </div>
    );
  }
  constructor(props) {
    super(props);
  }
}
function mapState(state) {
  return {
    isLoading: state.isLoading,
  }
}
App = connect(mapState)(App)

export default App;
