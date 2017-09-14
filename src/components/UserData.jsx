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
  InputGroup,
  ButtonGroup,
  Col} from 'react-bootstrap';
import {reduxForm, focus} from 'redux-form';
import './UserData.css';
import {openPopUp} from '../actions/pop-up';
import {updateUserData} from '../actions/users';
import {Field} from 'redux-form';
import moment from 'moment';
import {LinkContainer} from 'react-router-bootstrap';

export class UserData extends React.Component {
  onSubmit(value) {

    let popup = {
      status: 'updating',
      title: 'Update Results',
      description: 'Please wait. Updating user data',
      returnTo: '/Dashboard'
    }
    this.props.dispatch(openPopUp(popup));

    // dispatch to update the api
    let record = {
      firstName: value.firstName,
      lastName: value.lastName,
      lmd: value.lastMenstration,
      dueDate: value.dueDate
    }
    return this.props.dispatch(updateUserData(record));
  }

  createFooter() {
    let lmd = this.props.lastMenstration;
    let dd = this.props.dueDate;
    if(dd !== '' ) { return('Due date: ' + moment(dd).format("dddd, MMMM Do, YYYY"));}
    if(lmd !== '') { return('Estimated due date: ' + moment(lmd).add(240,'days').format("dddd, MMMM Do, YYYY"));}
    return('Enter a valid last menstration date or due date.');
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
    <Form 
      className='userDataForm' 
      onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      onReset={this.props.reset}
      horizontal>
      {error}
      <FormGroup controlId="formControlsUserName">
        <Col componentClass={ControlLabel} sm={2}>
          User Name
        </Col>
        <Col sm={10}> 
          <FormControl componentClass={Field} component="input" 
              name="userName"
              type="email"
              label="User Name"
              readOnly
          />
        </Col> 
      </FormGroup>
      <FormGroup controlId="formControlsFirstName">
        <Col componentClass={ControlLabel} sm={2}>
          First name
        </Col> 
        <Col sm={10}>      
          <FormControl componentClass={Field} component="input"  
              name="firstName"
              type="text"
              placeholder="first name"
          />
        </Col> 
      </FormGroup>
      <FormGroup controlId="formControlsLastName">
        <Col componentClass={ControlLabel} sm={2}>
          Last name
        </Col>    
        <Col sm={10}>  
          <FormControl componentClass={Field} component="input"  
              name="lastName"
              type="text"
              placeholder="last name"
          />
        </Col> 
      </FormGroup>
      <Panel header="Due date calculator" footer={this.createFooter()}>
        <ListGroup fill>
          <ListGroupItem>
            <FormGroup controlId="formControlsLastMenstration">
              <Col componentClass={ControlLabel} sm={3}>
                Last menstration date
              </Col>
              <Col sm={9}> 
                <InputGroup>         
                  <FormControl componentClass={Field} component="input" 
                      name="lastMenstration"
                      type="date"
                  />
                </InputGroup>
              </Col>
              <Col sm={12}>
                <HelpBlock>This is used to calculate an estimated due date.  Once you get a more accurate date from your doctor, update the due date field below.  The estimated due date is determined by adding 40 weeks to the first day of your last menstrual period (assuming a 28 day cycle).</HelpBlock>
              </Col>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem>
            <FormGroup controlId="formControlsDueDate">
              <Col componentClass={ControlLabel} sm={3}>
                Due date from doctor
              </Col>   
              <Col sm={9}> 
                <InputGroup> 
                  <FormControl componentClass={Field} component="input" 
                      name="dueDate"
                      type="date"
                  />
                </InputGroup>
              </Col> 
              <Col sm={12}>
                <HelpBlock>This is the more accurate due date given by your doctor.<br />Note: If this due date is set, the app will ignore the estimated due date (calculated using the date of last menstration above).</HelpBlock>
              </Col>
            </FormGroup>
          </ListGroupItem>
        </ListGroup>
      </Panel>
      <ButtonGroup >
        <LinkContainer to="/Dashboard">
          <Button
            type="button"
            disabled={this.props.submitting}
            bsSize="lg">
            Cancel
          </Button>
        </LinkContainer>
        <Button
          type="reset"
          disabled={this.props.pristine || this.props.submitting}
          bsSize="lg">
          Reset
        </Button>
        <Button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}
          bsSize="lg"
          bsStyle="primary">
          Update
        </Button>
      </ButtonGroup>
    </Form>
    );
	}
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    const {userData} = state.form;
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
        userid: state.user.data.id,
        dueDate: userData 
            ? userData.values.dueDate 
            : '',
        lastMenstration: userData 
            ? userData.values.lastMenstration 
            : ''
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



