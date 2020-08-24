import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";


import Dashboard from './components/Dashboard/Dashboard';
import Auth from './components/auth/Auth';


function App() {

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }

    return false;
  }

  if (checkAuth()) {
    return (
      <Router>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Auth} />
        <Route path="/sign-in" component={Auth} />
        <Route path="/sign-up" component={Auth} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  )
}

export default App;
