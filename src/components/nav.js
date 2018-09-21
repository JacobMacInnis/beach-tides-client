import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from './logout';
import MyLocationsLink from './my-locations-link';
import Login from './login';
import Theme from './theme';
import './nav.css';

export class Nav extends Component {
  render() {
    return (
      <nav className='nav'>
        { !this.props.isAuthenticated && <Route component={Login}/> }
        { this.props.isAuthenticated && <Route component={MyLocationsLink} /> }
        {  this.props.isAuthenticated && <Route component={Logout}/> }
        { this.props.isAuthenticated && <Theme /> }
      </nav>
    )
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    onFavorites: state.favorite.onFavorites
  };
};
export default connect(mapStateToProps)(Nav);
