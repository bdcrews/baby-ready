import React from 'react';
import {reduxForm, focus} from 'redux-form';
import {Button} from 'react-bootstrap';
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
        {' '}<Button className='loginButton' bsSize="small" disabled={this.props.pristine || this.props.submitting} type='submit'>Log In</Button>
      </form>
    );
  }
}

export default reduxForm({
    form: 'login',
    onSubmitSuccess: (result, dispatch, props) => {
      // on smaller screens this will collapse the navbar when loggin in
      if((typeof(window) !== 'undefined') && (window.innerWidth < 768)) props.toggleCollapse();
    },
    onSubmitFail: (errors, dispatch) => {
      dispatch(focus('login', Object.keys(errors)[0]));
    }
})(LoginForm);
