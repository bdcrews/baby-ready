import React from 'react';
import {connect} from 'react-redux';
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
import {reduxForm} from 'redux-form';
import {filterJournal} from '../actions/journal';
import {Field} from 'redux-form';

export class JournalFilter extends React.Component {
  onSubmit(value) {
    // dispatch to update the api
    const filter = {};
    if(typeof value.titleFilter !== 'undefined') filter['title'] = value.titleFilter;
    if(value.doctorCheckbox!=='any') filter['doctorCheckbox'] = value.doctorCheckbox === 'true';
    if(value.importantCheckbox!=='any') filter['importantCheckbox'] = value.importantCheckbox === 'true';

    return this.props.dispatch(filterJournal(filter));
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

    const filterHeader = (<span>filter <Glyphicon glyph='glyphicon glyphicon glyphicon-chevron-down' /> </span>);
    return (
    <Form 
      className='JournalFilterForm' 
      onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      onReset={this.props.reset}
      horizontal>
      {error}

      <Accordion>
        <Panel header={filterHeader} eventKey='1' bsStyle='primary'>

          <FormGroup> 
            <Col componentClass={ControlLabel} sm={3}>
                Title:
            </Col>    
            <Col sm={9}> 
              <FormControl componentClass={Field} component='input' 
                    name='titleFilter'
                    placeholder='filter by page title'
                    label='Title'
              />
            </Col> 
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              <ControlLabel>
                  Doctor Visit:
              </ControlLabel>
            </Col>    
            <Col sm={9}> 
              <ControlLabel><Field name='doctorCheckbox' component='input' type='radio' value='true'/>{' '}
                Yes
              </ControlLabel>
                {' '}
              <ControlLabel><Field name='doctorCheckbox' component='input' type='radio' value='false'/>{' '}
                No
              </ControlLabel>
                {' '}
              <ControlLabel><Field name='doctorCheckbox' component='input' type='radio' value='any'/>{' '}
                any{' '}
              </ControlLabel>
            </Col> 
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>
              <ControlLabel>
                  Important:
              </ControlLabel>
            </Col>    
            <Col sm={9}> 
              <ControlLabel><Field name='importantCheckbox' component='input' type='radio' value='true'/>{' '}
                Yes
              </ControlLabel>
                {' '}
              <ControlLabel><Field name='importantCheckbox' component='input' type='radio' value='false'/>{' '}
                No
              </ControlLabel>
                {' '}
              <ControlLabel><Field name='importantCheckbox' component='input' type='radio' value='any'/>{' '}
                any{' '}
              </ControlLabel>
            </Col> 
          </FormGroup>

          <ButtonGroup className='pull-right'>
            <Button
              onClick={this.props.reset}
              disabled={this.props.pristine || this.props.submitting}>
              Reset
            </Button>
            <Button
              type='submit'
              disabled={this.props.pristine || this.props.submitting}
              bsStyle='primary'>
              Filter
            </Button>
          </ButtonGroup>
        </Panel>
      </Accordion>
    </Form>
    );
  }
}

const mapStateToProps = state => {
  const initialValues = {
    doctorCheckbox: 'any',
    importantCheckbox: 'any'
  };
  if('title' in state.journal.filter) initialValues['titleFilter'] = state.journal.filter.title;
  if('doctorCheckbox' in state.journal.filter) initialValues['doctorCheckbox'] = state.journal.filter.doctorCheckbox.toString();
  if('importantCheckbox' in state.journal.filter) initialValues['importantCheckbox'] = state.journal.filter.importantCheckbox.toString();

    const {currentUser} = state.auth;
    return {
        loggedIn: currentUser !== null,
        user: state.user.data,
        initialValues: initialValues,
        username: state.user.data.username
    };
};

const reduxJournalFilter = reduxForm({
    form: 'JournalFilter',
    enableReinitialize: true
  })(JournalFilter)

const ConnectedJournalFilter = connect(
  mapStateToProps
)(reduxJournalFilter); 

export default ConnectedJournalFilter;