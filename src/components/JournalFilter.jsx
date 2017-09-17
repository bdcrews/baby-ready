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
  Radio} from 'react-bootstrap';
import {reduxForm, focus} from 'redux-form';
import {openPopUp} from '../actions/pop-up';
import {newJournal, closeNewJournalPage, filterJournal} from '../actions/journal';
import {Field} from 'redux-form';
import {LinkContainer} from 'react-router-bootstrap';

export class JournalFilter extends React.Component {
  onSubmit(value) {
    console.log("Submitted");

    // dispatch to update the api
    const filter = {};
    if(value.titleFilter!=='') filter['title'] = value.titleFilter;
    if(value.docVisitFilter!=='any') filter['doctorCheckbox'] = value.docVisitFilter === "Yes";
    if(value.importantFilter!=='any') filter['importantCheckbox'] = value.importantFilter === "Yes";

    return this.props.dispatch(filterJournal(filter));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
console.log(this.props);
    return (
    <Form 
      className='JournalFilterForm' 
      onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      onReset={this.props.reset}
      horizontal>
      {error}

      <Accordion>
        <Panel header="filter" eventKey="1" bsStyle="primary">

          <FormGroup> 
            <Col componentClass={ControlLabel} sm={3}>
                Title:
            </Col>    
            <Col sm={9}> 
              <FormControl componentClass={Field} component="input" 
                    name="titleFilter"
                    placeholder="filter by page title"
                    label="Title"
                    placeholder="Type here"
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
              <ControlLabel><Field name="docVisitFilter" component="input" type="radio" value="Yes"/>{' '}
                Yes
              </ControlLabel>
                {' '}
              <ControlLabel><Field name="docVisitFilter" component="input" type="radio" value="No"/>{' '}
                No
              </ControlLabel>
                {' '}
              <ControlLabel><Field name="docVisitFilter" component="input" type="radio" value="any"/>{' '}
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
              <ControlLabel><Field name="importantFilter" component="input" type="radio" value="Yes"/>{' '}
                Yes
              </ControlLabel>
                {' '}
              <ControlLabel><Field name="importantFilter" component="input" type="radio" value="No"/>{' '}
                No
              </ControlLabel>
                {' '}
              <ControlLabel><Field name="importantFilter" component="input" type="radio" value="any"/>{' '}
                any{' '}
              </ControlLabel>
            </Col> 
          </FormGroup>

          <ButtonGroup >
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
    const {currentUser} = state.auth;
    return {
        loggedIn: currentUser !== null,
        user: state.user.data,
        initialValues: {
          titleFilter: state.journal.filter.title,
          docVisitFilter: state.journal.filter.doctorCheckbox,
          importantFilter: state.journal.filter.importantCheckbox
        },
        username: state.user.data.username
    };
};

const reduxJournalFilter = reduxForm({
    form: 'JournalFilter',
    onSubmitFail: (errors, dispatch) => {
      console.log(errors);
      //dispatch(focus('JournalFilter', Object.keys(errors)[0]));
    }
  })(JournalFilter)

const ConnectedJournalFilter = connect(
  mapStateToProps
)(reduxJournalFilter); 

export default ConnectedJournalFilter;