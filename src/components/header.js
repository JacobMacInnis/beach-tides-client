import React from 'react';
import './header.css';

export default class Header extends React.Component {
  render() {
    return (
        <header className='header'>
        <a className='logo' href='/'><img src={require('./../BeachTides.png')} alt='Beach Tides logo' width='100%'/></a>
        <hr />
        </header>
    )
  }
}