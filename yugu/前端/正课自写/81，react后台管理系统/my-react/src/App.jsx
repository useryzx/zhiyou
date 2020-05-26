import React from 'react';
import './App.css';
import Login from './views/Login/Login.jsx'
import { HashRouter, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="route">
      <HashRouter>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </HashRouter>
    </div>

  );
}

export default App;
