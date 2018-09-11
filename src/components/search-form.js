import React from 'react';
import Input from './search-form-input';
import { reduxForm, Field } from 'redux-form';
import {connect} from 'react-redux';
import { fetchLocation } from './../actions/index';

class SearchForm extends React.Component {
  
  onSubmit(values) {
    const location = values.location;
    const date = values.date;
    return this.props.dispatch(
    fetchLocation(location, date))
  };
  
  render() {
    // console.log('HI', this.props.tideData)
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
            />
          <button type='submit'>SUBMIT</button>
        </form>
    )
  }
}

const mapStateToProps = state => {
  return {
  initialValues: { date: state.search.date },
  tideData: state.search.tideData
  }
}

const searchFrom = reduxForm({
  form: 'search',
})(SearchForm);

export default connect(mapStateToProps)(searchFrom)