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
  Col,
  PageHeader} from 'react-bootstrap';
import {reduxForm, focus} from 'redux-form';
import {openPopUp} from '../actions/pop-up';
import {updateUserData} from '../actions/users';
import {Field} from 'redux-form';
import moment from 'moment';
import {LinkContainer} from 'react-router-bootstrap';

export class UserData extends React.Component {
  componentDidMount() {
    var el = document.getElementById('formControlsNotes');
    if(el) {
      el.style.height = "5px";
      el.style.height = (el.scrollHeight + 4)+"px";
    }
  }

  handleKeyUp(e) {
      const el = e.target;
      el.style.height = "5px";
      el.style.height = (el.scrollHeight + 4)+"px";
  }

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
      dueDate: value.dueDate,
      bloodType: value.bloodType,
      rhFactor: value.rhFactor,
      docName: value.docName,
      docPhone: value.docPhone,
      userNotes: value.userNotes,
      colorTheme: value.colorTheme
    }
    return this.props.dispatch(updateUserData(record));
  }

  createFooter() {
    let lmd = this.props.lastMenstration;
    let dd = this.props.dueDate;
    if(dd !== '' ) { return('Due date: ' + moment(dd).format('dddd, MMMM Do, YYYY'));}
    if(lmd !== '') { return('Estimated due date: ' + moment(lmd).add(280,'days').format('dddd, MMMM Do, YYYY'));}
    return('Enter a valid last menstration date or due date.');
  }

  render() {
    //Only visible to logged in users
    if (!this.props.loggedIn) {
        return <Redirect to='/' />;
    }

    let error;
    if (this.props.error) {
      error = (
        <div className='form-error' aria-live='polite'>
          {this.props.error}
        </div>
      );
    }

    return (
      <div> 
        <PageHeader><span>User Data</span></PageHeader>
        <Form 
          className='userDataForm' 
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
          onReset={this.props.reset}
          horizontal>
          {error}
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              User Name
            </Col>
            <Col sm={4}> 
              <FormControl componentClass={Field} component='input' 
                  name='userName'
                  type='email'
                  label='User Name'
                  readOnly
              />
            </Col> 

            <Col componentClass={ControlLabel} sm={2}>
              Color Theme
            </Col>  
            <Col sm={4}>   
              <FormControl componentClass={Field} component='select' name='colorTheme'>
                <option value='green'>green</option>
                <option value='pink'>pink</option>
                <option value='blue'>blue</option>
              </FormControl>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              First name
            </Col> 
            <Col sm={4}>      
              <FormControl componentClass={Field} component='input'  
                  name='firstName'
                  type='text'
                  placeholder='first name'
              />
            </Col> 

            <Col componentClass={ControlLabel} sm={2}>
              Last name
            </Col>    
            <Col sm={4}>  
              <FormControl componentClass={Field} component='input'  
                  name='lastName'
                  type='text'
                  placeholder='last name'
              />
            </Col> 
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Bloodtype
            </Col>  
            <Col sm={4}>   
              <FormControl componentClass={Field} component='select' name='bloodType'>
                <option></option>
                <option value='O'>O</option>
                <option value='A'>A</option>
                <option value='B'>B</option>
                <option value='AB'>AB</option>
              </FormControl>
            </Col> 

            <Col componentClass={ControlLabel} sm={2}>
              Rh factor
            </Col>  
            <Col sm={4}>   
              <FormControl componentClass={Field} component='select' name='rhFactor'>
                <option></option>
                <option value='pos'>positive</option>
                <option value='neg'>negative</option>
              </FormControl>
            </Col> 
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Doctor Name
            </Col>  
            <Col sm={4}>   
              <FormControl componentClass={Field} component='input' name='docName'/>
            </Col> 

            <Col componentClass={ControlLabel} sm={2}>
              Doctor Phone Number
            </Col>  
            <Col sm={4}>   
              <FormControl componentClass={Field} component='input' name='docPhone' type='tel' />
            </Col> 
          </FormGroup> 

          <FormGroup controlId='formControlsNotes' className='container' onKeyUp={this.handleKeyUp}>
            <ControlLabel>Notes:</ControlLabel>
            <FormControl componentClass={Field} component='textarea' 
                  name='userNotes'
                  type='textarea'
                  label='User Notes'
                  placeholder='Type here any other information you want to keep handy.'
            />
          </FormGroup> 

          <Panel header='Due date calculator' footer={this.createFooter()}>
            <ListGroup fill>
              <ListGroupItem>
                <FormGroup controlId='formControlsLastMenstration'>
                  <Col componentClass={ControlLabel} sm={3}>
                    Last menstration date
                  </Col>
                  <Col sm={9}> 
                    <InputGroup>         
                      <FormControl componentClass={Field} component='input' 
                          name='lastMenstration'
                          type='date'
                      />
                    </InputGroup>
                  </Col>
                  <Col sm={12}>
                    <HelpBlock>This is used to calculate an estimated due date.  Once you get a more accurate date from your doctor, update the due date field below.  The estimated due date is determined by adding 40 weeks to the first day of your last menstrual period (assuming a 28 day cycle).</HelpBlock>
                  </Col>
                </FormGroup>
              </ListGroupItem>
              <ListGroupItem>
                <FormGroup controlId='formControlsDueDate'>
                  <Col componentClass={ControlLabel} sm={3}>
                    Due date from doctor
                  </Col>   
                  <Col sm={9}> 
                    <InputGroup> 
                      <FormControl componentClass={Field} component='input' 
                          name='dueDate'
                          type='date'
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

          <ButtonGroup className='pull-right'>
            <LinkContainer to='/Dashboard'>
              <Button
                type='button'
                disabled={this.props.submitting}>
                Cancel
              </Button>
            </LinkContainer>
            <Button
              type='reset'
              disabled={this.props.pristine || this.props.submitting}>
              Reset
            </Button>
            <Button
              type='submit'
              disabled={this.props.pristine || this.props.submitting}
              bsStyle='primary'>
              Update
            </Button>
          </ButtonGroup>
        </Form>
      </div>
    );
	}
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    const {userData} = state.form;
    console.log(state);
    return {
        loggedIn: currentUser !== null,
        user: state.user.data,
        initialValues: {
          userName: state.user.data.username,
          firstName: state.user.data.firstName,
          lastName: state.user.data.lastName,
          bloodType: state.user.data.bloodType,
          rhFactor: state.user.data.rhFactor,
          docName: state.user.data.docName,
          docPhone: state.user.data.docPhone,
          userNotes: state.user.data.userNotes,
          lastMenstration: String(state.user.data.lmd).split('T')[0],
          dueDate: String(state.user.data.dueDate).split('T')[0],
          colorTheme: state.user.data.colorTheme
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



