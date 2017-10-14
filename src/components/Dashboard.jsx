import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Grid, Row, Col, PageHeader} from 'react-bootstrap';
import {fetchUserData} from '../actions/users';
import {fetchJournal} from '../actions/journal';
import SmallUserData from './SmallUserData';
import SmallJournal from './SmallJournal';
import SmallTips from './SmallTips';

export class Dashboard extends React.Component {
  componentDidMount() {
    if (!this.props.loggedIn) {
      return;
    }
    this.props.dispatch(fetchUserData());
    this.props.dispatch(fetchJournal());
  }

  render() {
    // Only visible to logged in users
    if (!this.props.loggedIn) {
        return <Redirect to='/' />;
    }
    
    return (
      <section>
        <PageHeader><span>Baby Ready</span><small>Pregnancy Organizer</small></PageHeader>
        <Grid fluid>
          <Row className='show-grid'>
            <Col xs={12} sm={6} md={6}>
              <SmallUserData />
            </Col>
            <Col xs={12} sm={6} md={6}>
              <SmallJournal />
            </Col>
            <Col xs={12} sm={6} md={6}>
              <SmallTips />
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
