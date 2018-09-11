import React from 'react';
import './nav.css';

export default function Nav(props) {
  
    return (
      <nav className='nav'>
        <ul className='nav-ul'>
          <li><a href='/auth/login'>LOGIN</a></li>
          <li><a href='/auth/logout'>LOGOUT</a></li>
        </ul>
      </nav>
    )
}

