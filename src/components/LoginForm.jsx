import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty} from '../validators';
import {login} from '../actions/auth';
import './LoginForm.css';

export class LoginForm extends React.Component {
	onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
	}

  render() {
    return (
        <div>
              <form
                  className="login-form"
                  onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                  <label htmlFor="email">Email</label>
                  <Field
                      component={Input}
                      type="email"
                      name="username"
                      validate={[required, nonEmpty]}
                  />
                  <label htmlFor="password">Password</label>
                  <Field
                      component={Input}
                      type="password"
                      name="password"
                      validate={[required]}
                  />
                  <button
                      className="loginButton"
                      type="submit"
                      disabled={this.props.pristine || this.props.submitting}>
                      Register
                  </button>
                </form>
        </div>
    );
  }  
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);