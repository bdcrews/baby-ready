import React from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import './Dashboard.css';

const titleJournal = (<h3>Journal</h3>);
const titleUserData = (<h3>User data</h3>);

export class Dashboard extends React.Component {
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
              User info
            </Panel>
          </Col>
        </Row>
      </Grid>
    </section>
    );  
  }    
}

export default connect()(Dashboard);

