import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MyLocationsLink extends Component {
  render() {
    return (
      <div>
        <Link to='/favorites' className='favorites-link'>MY LOCATIONS 2</Link>
      </div>
    )
  }
}