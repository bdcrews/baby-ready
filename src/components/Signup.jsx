import React from 'react';
import {connect} from 'react-redux';
import {Jumbotron} from 'react-bootstrap';
import './Signup.css';

import {FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';
function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export class Signup extends React.Component {

    render() {
    return (
	        <Jumbotron>
	            <h3>Sign Up</h3>
			    <form>
				    <FieldGroup
				      id="formControlsText"
				      type="text"
				      label=""
				      placeholder="First Name"
				    />
				    <FieldGroup
				      id="formControlsEmail"
				      type="email"
				      label=""
				      placeholder="Enter email"
				    />
				    <FieldGroup
				      id="formControlsPassword"
				      label=""
				      type="password"
				      placeholder="New password"
				    />

				    <Button type="submit" bsStyle="primary">Submit</Button>
			    </form>
	        </Jumbotron>
	    );	
	}		
}

export default connect()(Signup);

