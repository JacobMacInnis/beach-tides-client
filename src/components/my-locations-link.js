import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MyLocationsLink extends Component {
  render() {
    return (
      <div className='favorites-link-container'>
        <Link to='/favorites' className='favorites-link'>MY LOCATIONS 2</Link>
      </div>
    )
  }
}