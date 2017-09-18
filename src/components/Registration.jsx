import React from 'react';
import {reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import {Jumbotron} from 'react-bootstrap';
import './Registration.css';
import {required, nonEmpty, matches, length, isTrimmed, email} from '../validators';
import FieldGroup from './FieldGroup'
import {Button} from 'react-bootstrap';

export class Registration extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
          <Jumbotron>
            <h3>Sign Up</h3>
            {error}
            <form
              className="registration-from"
              onSubmit={this.props.handleSubmit(values =>
              this.onSubmit(values)
              )}>
              <FieldGroup
                id="formFirstName"
                name="firstName"
                type="text"
                label="First name"
                placeholder=""
              />
              <FieldGroup
                id="formLastName"
                name="lastName"
                type="text"
                label="Last name"
                placeholder=""
              />
              <FieldGroup
                id="formControlsEmail"
                name="username"
                type="email"
                label="Email"
                placeholder=""
                validate={[required, nonEmpty, isTrimmed, email]}
              />
              <FieldGroup
                id="formControlsPassword"
                name="password"
                label="Password"
                type="password"
                placeholder=""
                validate={[required, length({min: 10, max: 72}), isTrimmed]}
              />
              <FieldGroup
                id="formControlsConfirmPassword"
                name="confirmPassword"
                label="Confirm password"
                type="password"
                placeholder=""
                validate={[required, matches('password')]}
              />
               <Button 
                type="submit"
                disabled={this.props.pristine || this.props.submitting}>
                Register
              </Button>
            </form>
          </Jumbotron>
      );  
  }    
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) => {
      dispatch(focus('registration', Object.keys(errors)[0]));
    }
})(Registration);

