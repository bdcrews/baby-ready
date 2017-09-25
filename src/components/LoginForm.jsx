import React from 'react';
import './LoginForm.css';
import {reduxForm, focus} from 'redux-form';
import {Button, ButtonGroup} from 'react-bootstrap';
import {login} from '../actions/auth';
import FieldGroup from './FieldGroup'
import {required, nonEmpty, isTrimmed, email} from '../validators';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.email, values.password));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className='form-error' aria-live='polite'>
          {this.props.error}
        </div>
      );
    }
    return(
      <form className='loginForm' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        {error}
        <FieldGroup
          id='formControlsEmail'
          name='email'
          type='email'
          label='Email'
          placeholder=''
          validate={[required, nonEmpty, isTrimmed, email]}
        />
        {' '}
        <FieldGroup
          id='formControlsPassword'
          name='password'
          label='Password'
          type='password'
          placeholder=''
          validate={[required, nonEmpty, isTrimmed]}
        />
        {' '}
        <Button className='loginButton'  disabled={this.props.pristine || this.props.submitting} type='submit'>Log In</Button>
        <br />
        <ButtonGroup bsSize="xsmall" className="pull-right">
          <Button href='#register' bsStyle="info">sign up </Button>
          <Button href='#register' bsStyle="info"> demo </Button>
        </ButtonGroup>
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