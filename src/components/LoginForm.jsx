import React from 'react';
import './LoginForm.css';
import {reduxForm, focus} from 'redux-form';
import {Button} from 'react-bootstrap';
import {login} from '../actions/auth';
import FieldGroup from './FieldGroup'

export class LoginForm extends React.Component {
  onSubmit(event) {
    event.preventDefault();
    console.log("Here");
    let usernameTaget = document.getElementById('formControlsEmail');
    let passwordTaget = document.getElementById('formControlsPassword');
    return this.props.dispatch(login(usernameTaget.value, passwordTaget.value));
  }

  render() {
    return(
        <form>
  					  <FieldGroup
  					    id="formControlsEmail"
                name="email"
  					    type="email"
  					    label="Email"
  					    placeholder=""
  					    required
  					  />
  			      {' '}
  					  <FieldGroup
  					    id="formControlsPassword"
                name="password"
  					    label="Password"
  					    type="password"
  					    placeholder=""
                required
  					  />
  			      {' '}
  			      <Button className="loginButton" type="submit">Log In</Button>
              <br /><a className="forgotLogin" href="#">forgot login</a>
			  </form>
      );
  }  
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => {
      dispatch(focus('login', Object.keys(errors)[0]));
    }
})(LoginForm);