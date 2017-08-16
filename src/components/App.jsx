import React from 'react';
import {} from 'react-bootstrap';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './Landing'
import Dashboard from './Dashboard'
import NavBar from './NavBar'
import './App.css';

export function App(props) {
  return (
    <Router>
      <div className="App">
        <NavBar />
	        <Route exact path="/" component={Landing} />
	        <Route exact path="/Dashboard" component={Dashboard} />
      </div>
    </Router>
  );
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(App);