import React from 'react';
import PropTypes from 'prop-types';
import {Navbar} from 'react-bootstrap';
import {connect} from 'react-redux';
import LoginForm from './LoginForm'

export class NavbarForm extends React.Component {
  render() {
    return (
        <Navbar.Form pullRight >
          <LoginForm toggleCollapse={this.context.$bs_navbar.onToggle}/>
        </Navbar.Form >
    )
  }
}

NavbarForm.contextTypes = {
  $bs_navbar: PropTypes.shape({
    onToggle: PropTypes.func.isRequired
  })
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(NavbarForm);
