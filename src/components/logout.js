import React, { Component } from 'react';
import { logout } from './../actions/auth';
import { clearAuthToken} from '../local-storage';
import { setThemeOnLogout } from './../actions/favorite';
import {connect} from 'react-redux';

class Logout extends Component {
  logout = () => {
    this.props.dispatch(logout());
    clearAuthToken();
    this.props.dispatch(setThemeOnLogout());
  };
  render() {
    return (
      <button className='logout' onClick={() => this.logout()}>LOG OUT</button>
    );
  };
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    onFavorites: state.favorite.onFavorites
  };
};
export default connect(mapStateToProps)(Logout);
