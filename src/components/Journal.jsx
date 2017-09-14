import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Table,
  Image,
  Pagination} from 'react-bootstrap';
import {fetchJournal, setJournalPage, fetchOneJournal} from '../actions/journal';
import moment from 'moment';
import JournalUpdate from './JournalUpdate'

export class Journal extends React.Component {
  componentDidMount() {
    if (!this.props.loggedIn) {
      return;
    }
    this.props.dispatch(fetchJournal());
  }

  handleSelect(eventKey) {
    this.props.dispatch(setJournalPage(eventKey));
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
    

    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }

    const table = [];  
    const rowsOnPage = 2;
    let pageCount = 1; 
    if(this.props.journal.data) {
      pageCount = Math.trunc(this.props.journal.data.length / rowsOnPage);
      this.props.journal.data.forEach((record, index) => {
        const startIndex = (this.props.journal.activePage - 1) * rowsOnPage;
        if((index >= startIndex) && (index < startIndex + rowsOnPage)) {
          table.push(
            <tr key={record.id} id={record.id} onClick={this.handleRowClick.bind(this)}>
              <td>{record.title}</td>
              <td>{record.weight}</td>
              <td>{record.systolic}/{record.diastolic}</td>
              <td>{moment(record.timestamp).calendar()}</td>
              <td>
                {record.doctorCheckbox ? (<Image src="/docicon.png" rounded />) : ''}
                {record.importantCheckbox ? (<Image src="/important.png" rounded />) : ''}
              </td>
            </tr>
          );
        }
      });
    };


    return (
      <div>
      {error}
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