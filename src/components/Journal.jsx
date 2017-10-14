import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Table,
  Image,
  Pagination,
  Button,
  ButtonGroup,
  PageHeader} from 'react-bootstrap';
import {fetchJournal, setJournalPage, fetchOneJournal, openNewJournalPage} from '../actions/journal';
import moment from 'moment';
import JournalUpdate from './JournalUpdate'
import JournalNew from './JournalNew'
import JournalFilter from './JournalFilter'
import {LinkContainer} from 'react-router-bootstrap';

export class Journal extends React.Component {
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
        return <Redirect to='/' />;
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
        <div className='form-error' aria-live='polite'>
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
            {page.doctorCheckbox ? (<Image src='/docicon.png' rounded />) : ''}
            {page.importantCheckbox ? (<Image src='/important.png' rounded />) : ''}
          </td>
        </tr>
      )
    });

    return (
      <div>
        {error}
        <PageHeader><span>Journal</span></PageHeader>
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

        <ButtonGroup className='pull-right'>
          <Button onClick={()=>{this.props.dispatch(openNewJournalPage())}}>New</Button>
          <LinkContainer to='/Dashboard'><Button>return</Button></LinkContainer>
        </ButtonGroup>
      </div>
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