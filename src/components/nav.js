import React from 'react';
import './nav.css';
import {connect} from 'react-redux';
import { logout } from './../actions/auth'

class Nav extends React.Component {
  logout = () => {
    this.props.dispatch(logout())
  };
  render() {
    return (
      <nav className='nav'>
        <ul className='nav-ul'>
          <li><a href='/auth/login'>LOGIN</a></li>
          <li onClick={() => this.logout()}>LOGOUT</li>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
}


export default connect(mapStateToProps)(Nav);


