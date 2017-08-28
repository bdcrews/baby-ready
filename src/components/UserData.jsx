import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Button, 
  Form, 
  FormGroup, 
  FormControl, 
  ControlLabel, 
  HelpBlock, 
  Panel,
  ListGroup,
  ListGroupItem,
  InputGroup} from 'react-bootstrap';
import {reduxForm, focus} from 'redux-form';
import './UserData.css';
import {updateUserData} from '../actions/users';
import {Field} from 'redux-form';


export class UserData extends React.Component {
  onSubmit(value) {
    let record = {
      firstName: value.firstName,
      lastName: value.lastName,
      lmd: value.lastMenstration,
      dueDate: value.dueDate
    }
    return this.props.dispatch(updateUserData(record));
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

    console.log(this.props);
    //let lmdElement = document.getElementById("formControlsLastMenstration");
 console.log(this.lastMenstration ? this.lastMenstration.value : "undefined");

    let lmd = new Date(this.lastMenstration ? this.lastMenstration.value : this.props.user.lmd);

    //console.log(document.getElementById("formControlsLastMenstration"));
    //let lmd = new Date(this.props.user.lmd);
    let estimateDueDate = new Date();
    estimateDueDate.setDate(lmd.getDate() + 240);


    let dueDateFooter = estimateDueDate.toString();
    /*tempDueDate.getFullYear() + '-' +
      tempDueDate.getMonth() + '-' +
      tempDueDate.getDate();
      */

    let timeDelta = (estimateDueDate.getTime() - Date.now());
    let daysDelta = Math.round(timeDelta/(1000*60*60*24));
    console.log(estimateDueDate);
    console.log(daysDelta);


    return (



    <Form inline className='userDataForm' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
      <FormGroup controlId="formControlsUserName">
        <ControlLabel>User Name</ControlLabel>
        {' '}
        <FormControl componentClass={Field} component="input" 
            name="userName"
            type="email"
            label="User Name"
            readOnly
        />
      </FormGroup>
      <br /><br />
      <FormGroup controlId="formControlsFirstName">
        <ControlLabel>First name</ControlLabel>
        {' '}         
        <FormControl componentClass={Field} component="input"  
            name="firstName"
            type="text"
            placeholder="first name"
        />
      </FormGroup>
      <br /><br />
      <FormGroup controlId="formControlsLastName">
        <ControlLabel>Last name</ControlLabel>
        {' '}         
        <FormControl componentClass={Field} component="input"  
            name="lastName"
            type="text"
            placeholder="last name"
        />
      </FormGroup>
      <br /><br />

      <Panel header="Due date calculator" footer={dueDateFooter}>
        <ListGroup fill>
          <ListGroupItem>
            <FormGroup controlId="formControlsLastMenstration">
              <ControlLabel>Date of last menstration</ControlLabel>
              {' '}
              <InputGroup>         
                <FormControl componentClass={Field} component="input" 
                    name="lastMenstration"
                    type="date"
                    inputRef={(ref) => {this.lastMenstration = ref}}
                />
              <InputGroup.Addon>{estimateDueDate.toString()}</InputGroup.Addon>
              </InputGroup>
              <HelpBlock>This is used to calculate an estimated due date.  Once you get a more accurate estimate from your doctor, update the due date field below.  The estimated due date is determined by adding 40 weeks to the first day of your last menstrual period (assuming a 28 day cycle).</HelpBlock>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem>
            <FormGroup controlId="formControlsDueDate">
              <ControlLabel>Due Date</ControlLabel>
              {' '}         
              <FormControl componentClass={Field} component="input" 
                  name="dueDate"
                  type="date"
              />
              <HelpBlock>This is the more accurate due date given by your doctor.  If this due date is set, the estimated due date calculated above will be ignored.</HelpBlock>
            </FormGroup>
          </ListGroupItem>
        </ListGroup>
      </Panel>
      <Button
        type="submit"
        disabled={this.props.pristine || this.props.submitting}>
        Update
      </Button>
    </Form>



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
          lastMenstration: String(state.user.data.lmd).split('T')[0],
          dueDate: String(state.user.data.dueDate).split('T')[0]
        },
        userid: state.user.data.id
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



