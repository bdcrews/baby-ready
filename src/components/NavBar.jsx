import React from 'react';
import {connect} from 'react-redux';
import {Navbar, NavDropdown, MenuItem, Nav} from 'react-bootstrap';
import './NavBar.css';
import LoginForm from './LoginForm'
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {LinkContainer} from 'react-router-bootstrap';


export class NavBar extends React.Component {
  logOut() {
    this.props.dispatch(setCurrentUser(null));
    this.props.dispatch(setAuthToken(null));
    clearAuthToken();
  }

  linkToUserData() {
    console.log("linkToUserData() ");
  }

  render() {
    let menuOptions;
    if(!this.props.loggedIn) {
    	menuOptions = (
        <Navbar.Form pullRight>
        <LoginForm />
        </Navbar.Form >
      );
    }
    else {
    	menuOptions = (
        <Nav pullRight>
        <NavDropdown title={this.props.name} eventKey={2} id="basic-nav-dropdown" pullRight>
          <MenuItem header>Account</MenuItem>
          <MenuItem divider />
          <LinkContainer to="/Dashboard"><MenuItem eventKey={2.1} >Dashboard</MenuItem></LinkContainer>
          <LinkContainer to="/UserData"><MenuItem eventKey={2.2} >User data</MenuItem></LinkContainer>
          <LinkContainer to="/JournalNew"><MenuItem eventKey={2.3} >New journal page</MenuItem></LinkContainer>
          <MenuItem divider />
          <MenuItem eventKey={2.2} onClick={() => this.logOut()}>Logout</MenuItem>
        </NavDropdown>
        </Nav>
      );
    }

    return (
      <Navbar fixedTop collapseOnSelect className="NavBar">
        <Navbar.Header>
          <Navbar.Brand>
            <a >Baby Ready</a>
          </Navbar.Brand>
    			<Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {menuOptions}
        </Navbar.Collapse>
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

