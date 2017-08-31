import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import './Dashboard.css';
import {fetchUserData} from '../actions/users';
import SmallUserData from './SmallUserData'

const titleJournal = (<h3>Journal</h3>);

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

   // let dueDate = this.props.user.dueDate ? this.props.user.dueDate : 
   //                 (this.props.user.lmd ? this.props.user.lmd;

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
              <SmallUserData />
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

