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
  Accordion} from 'react-bootstrap';
import {reduxForm} from 'redux-form';
import {filterJournal} from '../actions/journal';
import {Field} from 'redux-form';

export class JournalFilter extends React.Component {
  onSubmit(value) {
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

          <ButtonGroup className="pull-right">
            <Button
              type="reset"
              disabled={this.props.pristine || this.props.submitting}>
              Reset
            </Button>
            <Button
              type="submit"
              disabled={this.props.pristine || this.props.submitting}
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
          docVisitFilter: state.journal.filter.doctorCheckbox || 'any',
          importantFilter: state.journal.filter.importantCheckbox || 'any'
        },
        username: state.user.data.username
    };
};

const reduxJournalFilter = reduxForm({
    form: 'JournalFilter',
    onSubmitFail: (errors, dispatch) => {
      //dispatch(focus('JournalFilter', Object.keys(errors)[0]));
    }
  })(JournalFilter)

const ConnectedJournalFilter = connect(
  mapStateToProps
)(reduxJournalFilter); 

export default ConnectedJournalFilter;