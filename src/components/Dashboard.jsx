import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Grid, Row, Col} from 'react-bootstrap';
import './Dashboard.css';
import {fetchUserData} from '../actions/users';
import SmallUserData from './SmallUserData';
import SmallJournal from './SmallJournal';
import SmallTips from './SmallTips';

export class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.loggedIn) {
      return;
    }
    this.props.dispatch(fetchUserData());
  }

  render() {
    // Only visible to logged in users
    if (!this.props.loggedIn) {
        return <Redirect to="/" />;
    }
    
    return (
      <section>
        <Grid fluid>
          <Row className="show-grid">
            <Col xs={12} sm={6} md={6}>
              <SmallTips />
            </Col>
            <Col xs={12} sm={6} md={6}>
              <SmallJournal />
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

