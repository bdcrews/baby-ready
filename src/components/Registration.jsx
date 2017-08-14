import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import {Jumbotron} from 'react-bootstrap';
import Input from './input';
import './Registration.css';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';


export class Registration extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        console.log(user);
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
    return (
	        <Jumbotron>
	            <h3>Sign Up</h3>
	            <form
	                className="registration-from"
                	onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
	                <label htmlFor="firstName">First name</label>
	                <Field component={Input} type="text" name="firstName"/>
	                <label htmlFor="lastName">Last name</label>
	                <Field component={Input} type="text" name="lastName" />
	                <label htmlFor="email">Email</label>
	                <Field
	                    component={Input}
	                    type="email"
	                    name="username"
	                    validate={[required, nonEmpty, isTrimmed]}
	                />
	                <label htmlFor="password">Password</label>
	                <Field
	                    component={Input}
	                    type="password"
	                    name="password"
	                    validate={[required, length({min: 10, max: 72}), isTrimmed]}
	                />
	                <label htmlFor="passwordConfirm">Confirm password</label>
	                <Field
	                    component={Input}
	                    type="password"
	                    name="passwordConfirm"
	                    validate={[required, nonEmpty, matches('password')]}
	                />
	                <button
	                    type="submit"
	                    disabled={this.props.pristine || this.props.submitting}>
	                    Register
	                </button>
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

