import React from 'react';
import {connect} from 'react-redux';
import {
  Button,
  Modal
  } from 'react-bootstrap';
import './PopUp.css';
import {closePopUp} from '../actions/pop-up';
import {Redirect} from 'react-router-dom';

export class PopUp extends React.Component { 
  close() {
    this.props.dispatch(closePopUp());
  }

  render() {
    if (this.props.status==='closed') {
        return <Redirect to={this.props.returnTo} />;
    }

    return(
      <div >
        <Modal show={this.props.status!=='closed'} onHide={this.close.bind(this)}>
          <Modal.Header closeButton={this.props.status!=='updating'}>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {(this.props.status==='updating') ? (<span><i className="fa fa-spinner fa-pulse"/> updating...</span>) : ''}
            {this.props.description}            
          </Modal.Body>

          <Modal.Footer>
            <Button 
              className='pull-right' 
              onClick={this.close.bind(this)}
              disabled={this.props.status==='updating'}>
              {(this.props.status==='updating') ? 'updating...':  'Close'}
            </Button>
          </Modal.Footer>

        </Modal>
      </div>
      );
  }
}

const mapStateToProps = state => {
    return {
        status: state.popup.status,
        title: state.popup.title,
        description: state.popup.description,
        returnTo: state.popup.returnTo
    };
};


export default connect(mapStateToProps)(PopUp);