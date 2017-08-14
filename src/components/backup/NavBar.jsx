import React from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {login} from '../actions/auth';
import './NavBar.css';
import LoginForm from './LoginForm'

export class NavBar extends React.Component {
	onSubmit(event) {
    event.preventDefault();
    let usernameTaget = document.getElementById('formControlsEmail');
    let passwordTaget = document.getElementById('formControlsPassword');
    console.log(usernameTaget.value);
    console.log(passwordTaget.value);
    return this.props.dispatch(login(usernameTaget.value, passwordTaget.value));
	}

  render() {
  	let menuOptions;
  	console.log(this);
    if(!this.props.loggedIn) {
    	menuOptions = (
        <LoginForm />
      );
    }
    else {
    	menuOptions = (
        <Nav>
          <NavItem eventKey={1} href="#">Login</NavItem>
          <NavItem eventKey={2} href="#">Link</NavItem>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
      );
    }



    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Pregnacy Organizer</a>
          </Navbar.Brand>
    			<Navbar.Toggle />
        </Navbar.Header>
        {menuOptions}
      </Navbar>
    );
  }  
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(NavBar);

