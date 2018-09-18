import React from 'react';
import {connect} from 'react-redux';
// import { reduxForm } from 'redux-form';
import { addNewLocation } from './../actions/favorite';
import { fetchProtectedData } from './../actions/protected-data';
import './form-favorites.css';

class FormFavorites extends React.Component {
  handleSubmitClick = (e) => {
    const newFavorite = this.newFavorite.value;
    e.preventDefault();
    this.props.dispatch(addNewLocation(newFavorite))
    .then(() => {
      this.props.dispatch(fetchProtectedData());
    })
  }
  render() {
      return (
        <form className='new-favorite-form' >
          <label htmlFor='new-favorite-input' className='new-favorite-label'>ENTER ZIPCODE or CITY FOLLOWED BY COMMA AND TWO LETTER STATE CODE</label>
          <input name='new-favorite-input' className='new-favorite-input' type='text' ref={input => this.newFavorite = input} placeholder='ZIPCODE OR CITY AND STATE'></input>
          <button type='submit' onClick={this.handleSubmitClick} className='new-favorite-button' >SUBMIT</button>
        </form>
      );
  }
}

export default connect()(FormFavorites);