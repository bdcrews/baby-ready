import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import FieldGroup from './FieldGroup'
import {Button} from 'react-bootstrap';
import {reduxForm, focus} from 'redux-form';
import {fetchUserData} from '../actions/users';
import './PersonalData.css';


export class PersonalData extends React.Component {
    componentDidMount() {
        if (!this.props.loggedIn) {
            return;
        }
        this.props.dispatch(fetchUserData());
    }



  onSubmit(value) {
    console.log('onSubmit');
        //const {lastMenstration, dueDate} = value;
        //const personalData = {lastMenstration, dueDate};
        //return this.props.dispatch(fetchUserData(personalData));
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
	      <form className='personalDataForm' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>

    {this.props.user.username}<br />
    {this.props.user.firstName}<br />
    {this.props.user.lastName}<br />
    {this.props.user.lmd}<br />
    {this.props.user.dueDate}<br />
	        {error}
          <FieldGroup
            id="formControlsUserName"
            name="userName"
            type="email"
            label="User Name"
            placeholder={this.props.user.username}
            readOnly="true"
          />
          <FieldGroup
            id="formControlsLastMenstration"
            name="lastMenstration"
            type="date"
            label="Date of last menstration"
            placeholder={this.props.user.lmd}
          />
          <FieldGroup
            id="formControlsLastMenstration"
            name="lastMenstration"
            type="date"
            label="Date of last menstration"
            placeholder={this.props.user.lmd}
          />
	        {' '}
	        <FieldGroup
	          id="formControlsDueDate"
	          name="dueDate"
	          label="Due Date"
	          type="date"
	          placeholder=""
	        />
	        {' '}
	        <Button disabled={this.props.pristine || this.props.submitting} className="personalDataSubmitBtn" type="submit">Submit</Button>
	      </form>
    );
	}
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        loggedIn: currentUser !== null,
        user: state.user.data
    };
};

const ConnectedPersonalData = connect(
	mapStateToProps
)(PersonalData);

export default reduxForm({
    form: 'personalData',
    onSubmitFail: (errors, dispatch) => {
      dispatch(focus('personalData', Object.keys(errors)[0]));
    }
})(ConnectedPersonalData);