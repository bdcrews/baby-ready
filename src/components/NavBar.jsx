import React from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import './NavBar.css';
import LoginForm from './LoginForm'
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

export class NavBar extends React.Component {
  logOut() {
    this.props.dispatch(setCurrentUser(null));
    this.props.dispatch(setAuthToken(null));
    clearAuthToken();
  }

  render() {
    let menuOptions;
    if(!this.props.loggedIn) {
    	menuOptions = (
        <LoginForm />
      );
    }
    else {
    	menuOptions = (
        <Nav>
        <NavDropdown title={this.props.name} eventKey={2} id="basic-nav-dropdown" pullRight>
          <MenuItem header>Account</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={2.1} onClick={() => this.logOut()}>Logout</MenuItem>
        </NavDropdown>
        </Nav>
      );
    }

    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Baby Ready</a>
          </Navbar.Brand>
    			<Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Form pullRight>
          {menuOptions}
        </Navbar.Form >
      </Navbar>
    );
  }  
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  return {
      loggedIn: currentUser !== null,
      username: currentUser ? state.auth.currentUser.username : '',
      name: currentUser
          ? `${currentUser.firstName} ${currentUser.lastName}`
          : ''
  };
};

export default connect(mapStateToProps)(NavBar);

