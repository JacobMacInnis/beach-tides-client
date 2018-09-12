import React from 'react';
import {connect} from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import Input from './search-form-input';

class FormFavorites extends React.Component {
  
  render() {
      return (
          <form>
            <Field 
              component={Input}
              name='newFavorite'
              label='Enter Zipcode or City and State'
              placeholder='Zipcode OR City and State'
            />
            <button type='submit'>SUBMIT</button>
          </form>
      );
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default reduxForm(connect(mapStateToProps)(FormFavorites));