import React from 'react';
import './header.css';

export default class Header extends React.Component {
  render() {
    return (
        <header>
        <img src={require('./../BeachTides.png')} alt='Beach Tides logo' width='100%'/>
        </header>
    )
  }
}