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
    const lmd = this.props.lmd;
    const dd = this.props.dueDate;

    if((dd !== '') || (lmd !== '')) { 
      const dueDate = dd ? moment(dd) : moment(lmd).add(240,'days');
      const now = moment();
      const deltaDays = dueDate.diff(now, 'days');
      const days = Math.abs(deltaDays%7);
      const weeks = Math.abs(Math.floor(deltaDays%7));
      let bannerText;      
      if(deltaDays>0) {
        if(weeks>0){
          if(days>0){
            bannerText = (<div>{weeks} weeks<br/>{days} days</div>);
          }
          else {
            bannerText = (<div>{weeks} weeks</div>);
          }
        }
        else { // weeks === 0
          bannerText = (<div>{days} days</div>);
        }
      }
      else if(deltaDays<0) {
        bannerText= (<div>{dueDate.fromNow()}</div>);
      }
      else { // deltaDays === 0
        bannerText= (<div>Today!!!</div>);
      }

      return(
        <ListGroupItem style={{"text-align": "center"}} className='centerText'>
          <strong className='dueDateBanner'>{bannerText}</strong>
          <small> Due: {dueDate.format('MMMM Do YYYY')}</small>
        </ListGroupItem>
      );
    }

    return ('');
  }

  createDoctor() {
    if (this.props.docName) {
      return(
        <ListGroupItem header={'Dr. ' + this.props.docName}>
          {this.props.docPhone}
        </ListGroupItem>
      );
    }

    return ('');
  }

  createBloodtype() {
    if (this.props.bloodType) {
      return(
        <ListGroupItem header='Bloodtype'>
          {this.props.bloodType} {this.props.rhFactor}
        </ListGroupItem>
      );
    }

    return ('');
  }

  createNotes() {
    if (this.props.userNotes) {
      return(
        <ListGroupItem header='Notes'>
          {this.props.userNotes}
        </ListGroupItem>
      );
    }

    return ('');
  }

  render() {
    return(
      <Panel header={titlePanel}>
        <ListGroup>
          {this.createDayCounter()}
          {this.createDoctor()}
          {this.createBloodtype()}
          {this.createNotes()}
        </ListGroup>
        <LinkContainer to='/UserData' className='pull-right'>
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
            : '',
        bloodType: userData
            ? userData.bloodType
            : '',
        rhFactor: userData
            ? userData.rhFactor
            : '',
        docName: userData
            ? userData.docName
            : '',
        docPhone: userData
            ? userData.docPhone
            : '',
        userNotes: userData
            ? userData.userNotes
            : ''
    };
};


export default connect(mapStateToProps)(SmallUserData);