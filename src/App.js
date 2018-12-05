import React, { Component } from 'react';
import './styles/main.css'; 
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import DashboardView from './components/DashboardView/DashboardView.js'; 
import Header from './components/Header/Header.js';
import HomeView from './components/HomeView/HomeView.js'; 
import LoginPage from './components/LoginPage/LoginPage.js'; 
import RegisterPage from './components/RegisterPage/RegisterPage.js';
class App extends Component {
  render() {
    return (
      <Router>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route
          path="/login"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
         <div className="App">
      <Header/>
          <Route path='/home' component={HomeView}/>
          <Route path='/dashboard' component={DashboardView}/>
        </div>
        <Route render={() => <h1>404</h1>} />
        </Switch>
      </Router> 
        
    );
  }
}

export default App;
