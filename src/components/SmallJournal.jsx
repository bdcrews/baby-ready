import React from 'react';
import {connect} from 'react-redux';
import {Panel,
  ListGroup,
  ListGroupItem, 
  Button,
  ButtonGroup
  } from 'react-bootstrap';
import moment from 'moment';
import {LinkContainer} from 'react-router-bootstrap';

const titlePanel = (<h3>Journal</h3>);

export class SmallJournal extends React.Component {

  render() {
    return(
      <Panel header={titlePanel}>
        <ListGroup>
          <ListGroupItem header={this.props.name}>{this.props.user.username}</ListGroupItem>
        </ListGroup>
        <ButtonGroup >
          <LinkContainer to="/Journal">
            <Button>View</Button>
          </LinkContainer>
          <LinkContainer to="/JournalNew">
            <Button>New</Button>
          </LinkContainer>
        </ButtonGroup >
      </Panel>
      );
  }
}

const mapStateToProps = state => {
    const journalData = state.user.data;
    return {
        user: journalData,
        name: journalData
            ? `${journalData.firstName} ${journalData.lastName}`
            : '',
        dueDate: journalData 
            ? journalData.dueDate 
            : '',
        lmd: journalData 
            ? journalData.lmd 
            : ''
    };
};


export default connect(mapStateToProps)(SmallJournal);