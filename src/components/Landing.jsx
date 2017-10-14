import React from 'react';
import {connect} from 'react-redux';
import {Panel, PageHeader, Image, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import Registration from './Registration'
import {Redirect} from 'react-router-dom';

const descriptionTitle1 = (<h3>Store and Quickly view important stats</h3>);
const descriptionTitle2 = (<h3>Record and view your pregnancy journal</h3>);
const descriptionTitle3 = (<h3>Get useful tips</h3>);
const descriptionTitle4 = (<h3>Demo</h3>);

export class Landing extends React.Component {
  render() {
  // If we are logged in redirect straight to the user's dashboard
  if (this.props.loggedIn) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section>
      <PageHeader><span>Baby Ready</span><small>Pregnancy Organizer</small></PageHeader>

      <Panel header={descriptionTitle1}>
        <Col sm={6}>
          Baby Ready gives you a convenient place to store important stats related to your pregnancy.  These stats are show on the opening page after login to give you quick access to your information.
          <br /><br />
        </Col>
        <Col sm={6}>
          <Image src='/help0101.png' alt='[placeholder for screenshot dashboard]' thumbnail className='center-block'/>
          <br />
        </Col>
      </Panel>

      <Panel header={descriptionTitle2}>
        <Col sm={4}>
          The Baby Ready Journal gives you a convenient place to jot down your thoughts. Weather that is a list of questions for your next doctor's visit or happy memories of your pregnancy that you don't want to forget.  
          <br /><br />
        </Col>
        <Col sm={4}>
          <Image src='help0201.png' alt='[placeholder for screenshot of journal]' thumbnail className='center-block'/>
          <br />
        </Col>
        <Col sm={4}>
          <Image src='help0202.png' alt='[placeholder for screenshot of journal]' thumbnail className='center-block'/>
          <br /><br />
        </Col>
      </Panel>

      <Panel header={descriptionTitle3}>
        <Col sm={6}>
          Baby Ready gives tips and suggestions to make your pregnancy go smoothly.
          <br /><br />
        </Col>
        <Col sm={6}>
          <Image src='/help0301.png' alt='[placeholder for screenshot of tips]' thumbnail className='center-block'/>
          <br />
        </Col>
      </Panel>

      <a id='register' className='anchor'>-</a>
      <Registration />
      
    </section>
    );  
  }    
}

const mapStateToProps = state => ({
 loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Landing);

