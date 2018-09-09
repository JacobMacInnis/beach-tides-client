import React from 'react';
import Input from './search-form-input';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment';
import { fetchLocation } from './../actions/index';

class SearchForm extends React.Component {
  
  onSubmit(values) {
    const location = values.location;
    const date = values.date;
    console.log(location, date)
    return this.props.dispatch(
    fetchLocation(location, date))
  };
  

  render() {
    let today = moment().format('YYYY-MM-DD');
    return (
        <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
          <h2>SEARCH TIDES</h2>
          <Field 
            component={Input}
            name='location'
            label='Please Enter Zipcode or City and State'
            placeholder='Zipcode OR City and State'
            />
          <Field 
            component={Input}
            name='date'
            type='date'
            label='Or Choose a Date'
            date={today}
            />
          <button type='submit'>SUBMIT</button>
        </form>
    )
  }
}


export default reduxForm({
  form: 'search',
  
})(SearchForm);