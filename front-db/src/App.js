import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import Dashboard from './Dashboard';
import Auth from './auth/Auth';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Auth} />
        <Route path="/sign-in" component={Auth} />
        <Route path="/sign-up" component={Auth} />
        <Route path="/dashboard" component={Dashboard}></Route>
      </Switch>

    </Router>
  );
}

export default App;
