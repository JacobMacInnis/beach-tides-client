import React from 'react';
import './header.css';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    return (
        <header className='header' className={this.props.theme === 'night' ? 'header night-header' : 'header day-header'}>
        <a className='logo' href='/'><img src={require('./../img/BeachTidesTransparent.png')} alt='Beach Tides logo' width='100%'/></a>
        {/* <hr /> */}
        </header>
    )
  }
}

const mapStateToProps = state => {
  return { 
    theme: state.favorite.theme
  }
}

export default connect(mapStateToProps)(Header);