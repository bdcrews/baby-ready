import React from 'react';
import {connect} from 'react-redux';
import {Panel,
  Button,
  ButtonGroup
  } from 'react-bootstrap';
import {openNewJournalPage} from '../actions/journal';
import {LinkContainer} from 'react-router-bootstrap';

const titlePanel = (<h3>Journal</h3>);

export class SmallJournal extends React.Component {

  render() {
    return(
      <Panel header={titlePanel}>
        {this.props.total} page{this.props.total === 1 ? '' : 's'}.
        <ButtonGroup className='pull-right'>
          <LinkContainer to='/Journal'>
            <Button>View</Button>
          </LinkContainer>
          <LinkContainer to='/Journal'>
            <Button onClick={()=>{this.props.dispatch(openNewJournalPage())}}>New</Button>
          </LinkContainer>
        </ButtonGroup >
      </Panel>
      );
  }
}

const mapStateToProps = state => {
    const journalData = state.journal;
    return {
        total: journalData.data.total,
    };
};


export default connect(mapStateToProps)(SmallJournal);