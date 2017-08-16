import React from 'react';
import {connect} from 'react-redux';
import {Panel, PageHeader, Image} from 'react-bootstrap';
import Registration from './Registration'
import {Redirect} from 'react-router-dom';
import './Landing.css';

const descriptionTitle1 = (<h3>Journal</h3>);
const descriptionTitle2 = (<h3>Record Data</h3>);

export class Landing extends React.Component {
  render() {
  // If we are logged in redirect straight to the user's dashboard
  if (this.props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section>
      <PageHeader>Baby Ready <small>Pregnancy Organizer</small></PageHeader>

      <Panel header={descriptionTitle1}>
        <Image src="" alt="[placeholder for screenshot of journal]" rounded />
        <br />
        The Baby Ready Journal gives you a convenient place to jot down your thoughts. Weather that is a list of questions for your next doctor's visit or happy memories of your pregnancy that you don't want to forget.
      </Panel>

      <Panel header={descriptionTitle2}>
        <Image src="" alt="[placeholder for screenshot of chart data]" rounded />
        <br />
        The Baby Ready Stats allows you to record data and view charts detailing your progress.
      </Panel>

      <Registration />
    </section>
    );  
  }    
}

const mapStateToProps = state => ({
 loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Landing);

