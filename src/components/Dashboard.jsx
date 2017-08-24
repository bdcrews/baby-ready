import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Grid, Row, Col, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import './Dashboard.css';
import PersonalData from './PersonalData'

const titleJournal = (<h3>Journal</h3>);
const titleUserData = (<h3>User data</h3>);

export class Dashboard extends React.Component {
  componentDidMount() {
      if (!this.props.loggedIn) {
          return;
      }
      //this.props.dispatch(fetchProtectedData());
  }

  clickJournal(event) {
    event.preventDefault();
    console.log("clickJournal");
    //this.props.dispatch();
  }
  clickUserData(event) {
    event.preventDefault();
    //this.props.dispatch();
    console.log("clickUserData");
  }

  render() {
    // Only visible to logged in users
    if (!this.props.loggedIn) {
        return <Redirect to="/" />;
    }

    return (
      <section>
        <PersonalData />
        <Grid fluid>
          <Row className="show-grid">
            <Col xs={12} sm={6} md={6}>
              <Panel header={titleJournal} onClick={(e)=> this.clickJournal(e)}>
                Journal
              </Panel>
            </Col>
            <Col xs={12} sm={6} md={6}>
              <Panel header={titleUserData} onClick={(e)=> this.clickUserData(e)}>
                <ListGroup>
                  <ListGroupItem>Username: {this.props.username}</ListGroupItem>
                  <ListGroupItem>Name: {this.props.name}</ListGroupItem>
                  <ListGroupItem>Protected data: {this.props.protectedData}</ListGroupItem>
                </ListGroup>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </section>
      );  
  }    
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        loggedIn: currentUser !== null,
        username: currentUser ? currentUser.username : '',
        name: currentUser
            ? `${currentUser.firstName} ${currentUser.lastName}`
            : ''
    };
};


export default connect(mapStateToProps)(Dashboard);

