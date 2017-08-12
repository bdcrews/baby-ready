import React from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import './NavBar.css';

import {logIn} from '../actions';

import {FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';
function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel><br />
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export class NavBar extends React.Component {
	submitLogin(event) {
		event.preventDefault();
    this.props.dispatch(logIn());
    console.log(this);
	}

  render() {
  	let menuOptions;
  	console.log(this);
    if(!this.props.loggedIn) {
    	menuOptions = (
        <div>
  			    <Navbar.Form pullRight onSubmit={(e) => this.submitLogin(e)} componentClass="form">
  					  <FieldGroup
  					    id="formControlsEmail"
  					    type="email"
  					    label="Email"
  					    placeholder=""
  					    required
  					  />
  			      {' '}
  					  <FieldGroup
  					    id="formControlsPassword"
  					    label="Password"
  					    type="password"
  					    placeholder=""
                required
  					  />
  			      {' '}
  			      <Button className="loginButton" type="submit">Log In</Button>
              <br /><a className="forgotLogin" href="#">forgot login</a>
  			    </Navbar.Form>
			  </div>
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

