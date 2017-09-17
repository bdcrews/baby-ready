import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Table,
  Image,
  Pagination,
  Button,
  ButtonGroup} from 'react-bootstrap';
import {fetchJournal, setJournalPage, fetchOneJournal, openNewJournalPage} from '../actions/journal';
import moment from 'moment';
import JournalUpdate from './JournalUpdate'
import JournalNew from './JournalNew'
import JournalFilter from './JournalFilter'
import {LinkContainer} from 'react-router-bootstrap';

export class Journal extends React.Component {
  componentDidMount() {
    if (!this.props.loggedIn) {
      return;
    }
    this.props.dispatch(fetchJournal());
  }

  handleSelect(eventKey) {
    this.props.dispatch(setJournalPage(eventKey));
    this.props.dispatch(fetchJournal());
  }

  handleRowClick(e) {
    e.preventDefault();
    this.props.dispatch(fetchOneJournal(e.currentTarget.id));
  }

  render() {
    //Only visible to logged in users
    if (!this.props.loggedIn) {
        return <Redirect to="/" />;
    }
    if(this.props.journal.updatingPage) {
        return (<JournalUpdate/>)
    }

    if(this.props.journal.addingPage) {
        return (<JournalNew/>)
    }
    

    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
 
    const rowsOnPage = this.props.journal.pageQuantity;
    const pageCount = Math.ceil(this.props.journal.data.count/rowsOnPage);

    const table = this.props.journal.data.pages.map((page) => {
      return (
        <tr key={page.id} id={page.id} onClick={this.handleRowClick.bind(this)}>
          <td>{page.title}</td>
          <td>{page.weight}</td>
          <td>{page.systolic}/{page.diastolic}</td>
          <td>{moment(page.timestamp).calendar()}</td>
          <td>
            {page.doctorCheckbox ? (<Image src="/docicon.png" rounded />) : ''}
            {page.importantCheckbox ? (<Image src="/important.png" rounded />) : ''}
          </td>
        </tr>
      )
    });

    return (
      <div>
        {error}
        <JournalFilter />
        <Table striped bordered condensed hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Weight</th>
              <th>Blood Pressure</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {table}
          </tbody>
        </Table>

        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={pageCount}
          maxButtons={5}
          activePage={this.props.journal.activePage}
          onSelect={this.handleSelect.bind(this)} />

          <br/>
          <ButtonGroup>
            <Button onClick={()=>{this.props.dispatch(openNewJournalPage())}}>New</Button>
            <LinkContainer to="/Dashboard"><Button>return</Button></LinkContainer>
          </ButtonGroup>
        </div>

/*
        //this.props.journal.data[0].
      username: this.props.username,
      title: value.title,
      journalText: value.journalText,
      timestamp: value.timestamp,
      doctorCheckbox: value.doctorCheckbox,
      importantCheckbox: value.importantCheckbox,
      weight: value.weight,
      systolic: value.systolic,
      diastolic: value.diastolic
*/
    );
	}
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        loggedIn: currentUser !== null,
        journal: state.journal
    };
};

export default connect(mapStateToProps)(Journal);