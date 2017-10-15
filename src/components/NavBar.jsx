import React from 'react';
import {connect} from 'react-redux';
import {Navbar, NavItem, Nav, Image, Button} from 'react-bootstrap';
import NavbarForm from './NavbarForm';
import './NavBar.css';
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import {LinkContainer} from 'react-router-bootstrap';
import {bootstrapUtils} from 'react-bootstrap/lib/utils';
import {login} from '../actions/auth';


export class NavBar extends React.Component {
  //

  logOut() {
    this.scrollToAnchor('root');
    this.props.dispatch(setCurrentUser(null));
    this.props.dispatch(setAuthToken(null));
    clearAuthToken();
  }

  logInDemo() {
    this.scrollToAnchor('root');
    return this.props.dispatch(login("demo@mail.com", "brpassword"));
  }

  scrollToAnchor(anchor) {
    document.getElementById(anchor).scrollIntoView({behavior: 'smooth', block: "start", inline: "nearest" });
  }

  createNavBarButton(text, classes, eventKey, submitFunction) {
    return(
        <NavItem eventKey={eventKey} className="navMenuButton" onClick={submitFunction}>
          <i className={classes}/> 
          <p className="navButton">{text}</p>
        </NavItem>
    );
  }

  render() {
    let menuOptions;
    if(!this.props.loggedIn) {
    	menuOptions = (
        <Nav pullRight>
          <NavbarForm />
          {this.createNavBarButton("sign up", "fa fa-user-plus", 1, () => {this.scrollToAnchor('register')})}
          {this.createNavBarButton("demo", "fa fa-home", 2, () => {this.logInDemo()})}
        </Nav>
        );
    }
    else {
    	menuOptions = (
        <Nav pullRight>
            <LinkContainer to='/Dashboard'>{this.createNavBarButton("Dashboard", "fa fa-home", 1, () => {this.scrollToAnchor('root')})}</LinkContainer>
            <LinkContainer to='/UserData'>{this.createNavBarButton("User data", "fa fa-user-o", 2, () => {this.scrollToAnchor('root')})}</LinkContainer>
            <LinkContainer to='/Journal'>{this.createNavBarButton("Journal", "fa fa-book", 3, () => {this.scrollToAnchor('root')})}</LinkContainer>
            <LinkContainer to='/Help'>{this.createNavBarButton("Help", "fa fa-question", 4, () => {this.scrollToAnchor('root')})}</LinkContainer>
            {this.createNavBarButton((<strong>Logout</strong>), "fa fa-sign-out", 5, () => this.logOut())}
        </Nav>
      );
    }

    bootstrapUtils.addStyle(Button, 'custom');

    return (
      <Navbar fixedTop collapseOnSelect className='NavBar'>
        <Navbar.Header>
            <LinkContainer to='/Dashboard'>
              <Button bsStyle="custom" tabIndex="-1" onClick={() => {this.scrollToAnchor('root')}}>
                <Image src='/icons/crib.png' responsive />
              </Button>
            </LinkContainer>
    			<Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse id='menuId'>
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
  };
};

export default connect(mapStateToProps)(NavBar);
