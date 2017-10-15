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
  Glyphicon,
  PageHeader} from 'react-bootstrap';
import {reduxForm, focus} from 'redux-form';
import {openPopUp} from '../actions/pop-up';
import {newJournal, closeNewJournalPage} from '../actions/journal';
import {Field} from 'redux-form';

export class JournalNew extends React.Component {
  handleKeyUp(e) {
      const el = e.target;
      el.style.height = "5px";
      el.style.height = (el.scrollHeight + 4)+"px";
  }

  onSubmit(value) {
    let popup = {
      status: 'updating',
      title: 'Updating journal',
      description: 'Please wait. Updating user data',
      returnTo: '/Journal'
    }
    this.props.dispatch(openPopUp(popup));

    // dispatch to update the api
    let record = {
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
    return this.props.dispatch(newJournal(record));
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

    const detailsHeader = (<span>details <Glyphicon glyph='glyphicon glyphicon glyphicon-chevron-down' /> </span>);
    
    return (
    <div>
      <PageHeader><span>Journal</span></PageHeader>
      <Form 
        className='JournalForm' 
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
        onReset={this.props.reset}
        horizontal>
        {error}
        <FormGroup controlId='formControlsUserName'>
          <FormControl componentClass={Field} component='input' 
                name='title'
                type='text'
                label='Title'
                placeholder='Title'
          />
        </FormGroup>
        <FormGroup controlId='formControlsUserName'>
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
              onClick={()=>{this.props.dispatch(closeNewJournalPage())}}>
              Close
            </Button>
          <Button
            type='reset'
            disabled={this.props.pristine || this.props.submitting}>
            Reset
          </Button>
          <Button
            type='submit'
            disabled={this.props.pristine || this.props.submitting}
            bsStyle='primary'>
            Create
          </Button>
        </ButtonGroup>
      </Form>
    </div>
    );
  }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        loggedIn: currentUser !== null,
        user: state.user.data,
        initialValues: {
//          title: 'testtitle',
//          journalText: 'testjournaltext',
          timestamp: new Date().toJSON().slice(0,19),
//          doctorCheckbox: true,
//          importantCheckbox: true
//          weight: 
//          systolic: 
//          diastolic: 
        },
        username: state.user.data.username
    };
};

const reduxJournalNew = reduxForm({
    form: 'JournalNew',
    onSubmitFail: (errors, dispatch) => {
      dispatch(focus('JournalNew', Object.keys(errors)[0]));
    }
  })(JournalNew)

const ConnectedJournalNew = connect(
  mapStateToProps
)(reduxJournalNew); 

export default ConnectedJournalNew;