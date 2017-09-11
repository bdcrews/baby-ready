import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Landing from './Landing'
import Dashboard from './Dashboard'
import UserData from './UserData'
import NavBar from './NavBar'
import PopUp from './PopUp'
import './App.css';
import {refreshAuthToken} from '../actions/auth';

export class App extends React.Component {
  componentDidMount() {
    if (this.props.hasAuthToken) {
      // Try to get a fresh auth token if we had an existing one in
      // localStorage
      this.props.dispatch(refreshAuthToken());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && !this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically
      this.startPeriodicRefresh();
    } else if (!nextProps.loggedIn && this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }

  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }

  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }

    clearInterval(this.refreshInterval);
  }

  render() {
    return (
    <Router>
      <div className="App">
        <NavBar />
        <PopUp />
        <div className="container">
		    <Route exact path="/" component={Landing} />
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/UserData" component={UserData} />
        </div>
      </div>
    </Router>
  	);
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(App);