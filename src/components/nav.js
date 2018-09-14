import React from 'react';
import './nav.css';
import {connect} from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';


class Nav extends React.Component {
  state = {
    showFavoritesLink: false,
    loginRedirect: false
  }
  showSeeMyFavoritesLink() {
    return <Link to='/favorites'>SEE MY FAVORITES</Link>
  }
  render() {
    
    if (this.props.isAuthenticated && this.props.onFavorites === false) {
      return (
        <nav className='nav'>
          {this.showSeeMyFavoritesLink()}
        </nav>
      )
    } else {
      return (
        <nav className='nav'>
        
        </nav>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    onFavorites: state.favorite.onFavorites
  }
} 

export default withRouter(connect(mapStateToProps)(Nav))