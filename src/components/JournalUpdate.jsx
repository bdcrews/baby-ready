import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Button, 
  Form, 
  FormGroup, 
  FormControl, 
  ControlLabel, 
  Panel,
  ButtonGroup,
  Col,
  Accordion,
  Glyphicon} from 'react-bootstrap';
import {reduxForm, focus} from 'redux-form';
import {openPopUp} from '../actions/pop-up';
import {closeUpdateJournalPage, updateJournal, deleteJournalPage} from '../actions/journal';
import {Field} from 'redux-form';

export class JournalUpdate extends React.Component {
  componentDidMount() {
    var el = document.getElementById('formControlsText');
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
    const popup = {
      status: 'updating',
      title: 'Updating journal',
      description: 'Please wait. Updating user data',
      returnTo: '/Journal'
    }
    this.props.dispatch(openPopUp(popup));

    // dispatch to update the api
    const record = {
      username: this.props.username,
      title: value.title,
      journalText: value.journalText,
      timestamp: value.timestamp,
      doctorCheckbox: value.doctorCheckbox,
      importantCheckbox: value.importantCheckbox,
      weight: value.weight,
      systolic: value.systolic,
      diastolic: value.diastolic
    }

    return this.props.dispatch(updateJournal( this.props.journal.singleJournal.id,record));
  };

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

    const detailsHeader = (<span>details <Glyphicon glyph='glyphicon glyphicon glyphicon-chevron-down' /> </span>);

    return (
    <Form 
      className='JournalForm' 
      onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      onReset={this.props.reset}
      horizontal>
      {error}
      <FormGroup controlId='formControlsTitle'>
        <FormControl componentClass={Field} component='input' 
              name='title'
              type='text'
              label='Title'
              placeholder='Title'
        />
      </FormGroup>
      <FormGroup controlId='formControlsText'>
        <FormControl componentClass={Field} component='textarea' onKeyUp={this.handleKeyUp}
              name='journalText'
              type='textarea'
              label='JournalText'
              placeholder='Type here'
        />
      </FormGroup> 

      <Accordion>
        <Panel header={detailsHeader} eventKey='1' bsStyle='primary'>
          <FormGroup>  
            <Col componentClass={ControlLabel} sm={2}>
              Date: 
            </Col>    
            <Col sm={10}> 
              <FormControl componentClass={Field} component='input' 
                name='timestamp'
                type='datetime-local'
              />
            </Col> 
          </FormGroup> 
          <FormGroup>
            <Col sm={2}>
            </Col>    
            <Col sm={10}> 
              <Field name='doctorCheckbox' component='input' type='checkbox'/>
              {'  '}
              <ControlLabel>Doctor visit</ControlLabel>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2}>
            </Col>    
            <Col sm={10}> 
              <Field name='importantCheckbox' component='input' type='checkbox'/>
              {'  '}
              <ControlLabel>Important</ControlLabel>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              Weight: 
            </Col> 
            <Col sm={10}>      
              <FormControl componentClass={Field} component='input'  
                  name='weight'
                  type='number'
                  min='0'
                  max='1000'
              />
            </Col> 
          </FormGroup>

          <Panel header='Blood Pressure' >
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Top Number (Systolic): 
              </Col> 
              <Col sm={10}>      
                <FormControl componentClass={Field} component='input'  
                    name='systolic'
                    type='number'
                    min='0'
                    max='1000'
                />
              </Col> 
            </FormGroup>
            <FormGroup>
              <Col componentClass={ControlLabel} sm={2}>
                Bottom Number (Diastolic): 
              </Col> 
              <Col sm={10}>      
                <FormControl componentClass={Field} component='input'  
                    name='diastolic'
                    type='number'
                    min='0'
                    max='1000'
                />
              </Col> 
            </FormGroup>
          </Panel>
        </Panel>
      </Accordion>

      <ButtonGroup className='pull-right'>
          <Button
            type='button'
            disabled={this.props.submitting}
            onClick={() => this.props.dispatch(closeUpdateJournalPage())}>
            Cancel
          </Button>
        <Button
          type='reset'
          disabled={this.props.pristine || this.props.submitting}>
          Reset
        </Button>
        <Button
          type='button'
          disabled={this.props.submitting}
          onClick={() => {
            if(window.confirm('Are you sure you want to delete this page?')) {
              this.props.dispatch(deleteJournalPage(this.props.journal.singleJournal.id));
            }
          }}
          bsStyle='danger'>
          Delete
        </Button>
        <Button
          type='submit'
          disabled={this.props.pristine || this.props.submitting}
          bsStyle='primary'>
          Update
        </Button>
      </ButtonGroup>
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
        title: state.journal.singleJournal ? state.journal.singleJournal.title : '',
        journalText: state.journal.singleJournal ? state.journal.singleJournal.journalText : '',
        timestamp: state.journal.singleJournal ? state.journal.singleJournal.timestamp.substring(0, state.journal.singleJournal.timestamp.indexOf('.'))  : '',
        doctorCheckbox: state.journal.singleJournal ? state.journal.singleJournal.doctorCheckbox : '',
        weight: state.journal.singleJournal ? state.journal.singleJournal.weight : '',
        systolic: state.journal.singleJournal ? state.journal.singleJournal.systolic : '',
        diastolic: state.journal.singleJournal ? state.journal.singleJournal.diastolic : ''
        },
        username: state.user.data.username,
        journal: state.journal
    };
};

const reduxJournalUpdate = reduxForm({
    form: 'JournalUpdate',
    onSubmitFail: (errors, dispatch) => {
      dispatch(focus('JournalUpdate', Object.keys(errors)[0]));
    }
  })(JournalUpdate)

const ConnectedJournalUpdate = connect(
  mapStateToProps
)(reduxJournalUpdate); 

export default ConnectedJournalUpdate;