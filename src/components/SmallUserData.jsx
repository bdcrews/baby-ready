import React from 'react';
import {connect} from 'react-redux';
import {Panel,
  ListGroup,
  ListGroupItem, 
  Button
  } from 'react-bootstrap';
import moment from 'moment';
import {LinkContainer} from 'react-router-bootstrap';

const titlePanel = (<h3>User data</h3>);

export class SmallUserData extends React.Component {
  createDayCounter() {
    let lmd = this.props.lmd;
    let dd = this.props.dueDate;

    if((dd === '') && (lmd === '')) { 
      return('Please update user data.');
    }

    let days = dd 
      ? moment(dd).fromNow()
      : moment(lmd).add(240,'days').fromNow();

    return(
      <div>
        Baby {days} 
      </div>
      )
  }

  render() {
    return(
      <Panel header={titlePanel}>
        <ListGroup>
          <ListGroupItem header={this.props.name}>{this.props.user.username}</ListGroupItem>
          <ListGroupItem>
            {this.createDayCounter()}
          </ListGroupItem>
        </ListGroup>
        <LinkContainer to="/UserData" className="pull-right">
          <Button >Update</Button>
        </LinkContainer>
      </Panel>
      );
  }
}

const mapStateToProps = state => {
    const userData = state.user.data;
    return {
        user: userData,
        name: userData
            ? `${userData.firstName} ${userData.lastName}`
            : '',
        dueDate: userData 
            ? userData.dueDate 
            : '',
        lmd: userData 
            ? userData.lmd 
            : ''
    };
};


export default connect(mapStateToProps)(SmallUserData);