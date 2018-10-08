import React from 'react';
import './instruction.css';

export default class Instruction extends React.Component {
  render() {
    return (
        <section className='info'>
          <h3>BeachTides.US</h3>
          <p>Beach Tides shows Tide Predictions for United States Coasts.  To get current tide Predictions please enter a valid U.S. zipcode or a city (comma) and state.  To see future tides set the date to a different date.</p>
        </section>
    )
  }
};