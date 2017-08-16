import React from 'react';
import './LoginForm.css';
import {reduxForm, focus} from 'redux-form';
import {Button} from 'react-bootstrap';
import {login} from '../actions/auth';
import FieldGroup from './FieldGroup'
import {required, nonEmpty, isTrimmed, email} from '../validators';

export class LoginForm extends React.Component {
  onSubmit(values) {
    console.log("Here");
    return this.props.dispatch(login(values.email, values.password));
  }

  render() {
    return(
        <form className='loginForm' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
  					  <FieldGroup
  					    id="formControlsEmail"
                name="email"
  					    type="email"
  					    label="Email"
  					    placeholder=""
                validate={[required, nonEmpty, isTrimmed, email]}
  					  />
  			      {' '}
  					  <FieldGroup
  					    id="formControlsPassword"
                name="password"
  					    label="Password"
  					    type="password"
  					    placeholder=""
                validate={[required, nonEmpty, isTrimmed]}
  					  />
  			      {' '}
  			      <Button disabled={this.props.pristine || this.props.submitting} className="loginButton" type="submit">Log In</Button>
              <br /><p className="forgotLogin"> <a href="#">forgot login</a></p>
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