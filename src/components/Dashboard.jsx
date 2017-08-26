import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Grid, Row, Col, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import './Dashboard.css';
import {fetchUserData} from '../actions/users';
import {Link} from 'react-router-dom';

const titleJournal = (<h3>Journal</h3>);
const titleUserData = (<h3>User data</h3>);

export class Dashboard extends React.Component {
    componentDidMount() {
        if (!this.props.loggedIn) {
            return;
        }
        this.props.dispatch(fetchUserData());
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

    let dueDate = this.props.user.dueDate ? this.props.user.dueDate : this.props.user.lmd;

    return (
      <section>
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
                  <ListGroupItem>Username: {this.props.user.username}</ListGroupItem>
                  <ListGroupItem>Name: {this.props.name}</ListGroupItem>
                  <ListGroupItem>Due Date: {this.props.protectedData}</ListGroupItem>
                  <Link to="/UserData">User Data</Link>
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
    const userData = state.user.data;
    return {
        user: userData,
        loggedIn: currentUser !== null,
        name: userData
            ? `${userData.firstName} ${userData.lastName}`
            : ''
    };
};


export default connect(mapStateToProps)(Dashboard);

