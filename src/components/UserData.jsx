import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import FieldGroup from './FieldGroup'
import {Button} from 'react-bootstrap';
import {reduxForm, focus} from 'redux-form';
import './UserData.css';
import {updateUserData} from '../actions/users';


export class UserData extends React.Component {
  onSubmit(value) {
    console.log('onSubmit');
    return this.props.dispatch(updateUserData(this.props.user));
  }

  render() {

    //Only visible to logged in users
    if (!this.props.loggedIn) {
        return <Redirect to="/" />;
    }


    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
	      <form className='userDataForm' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          <FieldGroup
            id="formControlsUserName"
            name="userName"
            type="email"
            label="User Name"
          />
          <FieldGroup
            id="formControlsFirstName"
            name="firstName"
            type="text"
            label="First name"
            placeholder="first name"
          />
          <FieldGroup
            id="formControlsLastName"
            name="lastName"
            type="text"
            label="Last name"
            placeholder="last name"
          />
          <FieldGroup
            id="formControlsLastMenstration"
            name="lastMenstration"
            type="date"
            label="Date of last menstration"
          />
	        <FieldGroup
	          id="formControlsDueDate"
	          name="dueDate"
	          label="Due Date"
	          type="date"
	        />
          {error}
	        <Button disabled={this.props.pristine || this.props.submitting} className="userDataSubmitBtn" type="submit">Submit</Button>
	      </form>
    );
	}
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        loggedIn: currentUser !== null,
        user: state.user.data,
        initialValues: {
          userName: state.user.data.username,
          firstName: state.user.data.firstName,
          lastName: state.user.data.lastName,
          lastMenstration: state.user.data.lmd,
          dueDate: state.user.data.dueDate
        }
    };
};

const reduxUserData = reduxForm({
    form: 'userData',
    onSubmitFail: (errors, dispatch) => {
      dispatch(focus('userData', Object.keys(errors)[0]));
    }
  })(UserData)

const ConnectedUserData = connect(
  mapStateToProps
)(reduxUserData); 

export default ConnectedUserData;



