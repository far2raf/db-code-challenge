import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";


import Dashboard from './components/Dashboard/Dashboard';
import Auth from './components/auth/Auth';


function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));

  const checkAuth = () => {
    if (token) {
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
    );
  }

  return (
    checkAuth()
  )
}

export default App;
