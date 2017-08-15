import React from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import './NavBar.css';
import LoginForm from './LoginForm'

export class NavBar extends React.Component {
  render() {
  	console.log(this);
    /*
    let menuOptions;
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
    */

    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Baby Ready</a>
          </Navbar.Brand>
    			<Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Form pullRight onSubmit={(e) => this.onSubmit(e)}>
          <LoginForm />
        </Navbar.Form >
      </Navbar>
    );
  }  
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(NavBar);

