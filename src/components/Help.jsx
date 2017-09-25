import React from 'react';
import {connect} from 'react-redux';
import {Panel,
  Button,
  ButtonGroup,
  Image,
  Col,
  PageHeader} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Redirect} from 'react-router-dom';

const titleHelp = (<h3>Help Page</h3>);
const titleDashboard = (<h3>Dashboard</h3>);
const titleJournal = (<h3>Journal</h3>);

export class Help extends React.Component {

  render() {
    //Only visible to logged in users
    if (!this.props.loggedIn) {
        return <Redirect to='/' />;
    }

    return(
      <div>
        <PageHeader>Help</PageHeader>
        <Panel header={titleHelp}>
          <Col sm={4}>
            This is the help page.  It can be accessed anytime from the dropdown menu on the upper right.
            <br /><br />
          </Col>
          <Col sm={4}>
            <Image src='/help0002.png' alt='[Help link screenshot for small screens.]' thumbnail className='center-block'/>
            <br />
          </Col>
          <Col sm={4} >
              <Image src='/help0001.png' alt='[Help link screenshot for large screens.]' thumbnail className='center-block'/>
          </Col>
        </Panel>
        <Panel header={titleDashboard}>
          <Col sm={6}>
            The dashboard page is the first page you see after login onto the site.  It gives you quick access to your info, tips for your pregnancy, and quick access to the Journal.
            <br /><br />
          </Col>
          <Col sm={6}>
            <Image src='/help0101.png' alt='[Dashboard screenshot.]' thumbnail className='center-block'/>
            <br />
          </Col>
        </Panel>
        <Panel header={titleJournal}>
          <Col sm={6}>
            From the dashboard, click View on The journal to open a list of journal entries.  This list can be filtered by clicking the filter button.  From here you can create new journal pages, or view a specific journal page by clicking on that row.  
            <br /><br />
          </Col>
          <Col sm={6}>
            <Image src='/help0201.png' alt='[Journal screenshot.]' thumbnail className='center-block'/>
            <br />
          </Col>
          <Col sm={6}>
            When you create a new page or update a journal page a new screen will be shown that allows you to enter or update the journal page.  Update also gives the user the option to delete the page from the journal.
            <br /><br />
          </Col>
          <Col sm={6}>
            <Image src='/help0202.png' alt='[Update Journal screenshot.]' thumbnail className='center-block'/>
            <br />
          </Col>
        </Panel>
        <ButtonGroup className='pull-right'>
          <LinkContainer to='/Dashboard'>
            <Button bsStyle='primary'>Return to Dashboard</Button>
          </LinkContainer>
        </ButtonGroup >
        <br /><br /><br />
      </div>
    );
  }
}

const mapStateToProps = state => {
    const journalData = state.journal;
    const {currentUser} = state.auth;
    return {
        loggedIn: currentUser !== null,
        total: journalData.data.total,
    };
};

export default connect(mapStateToProps)(Help);