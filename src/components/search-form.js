import React from 'react';
import Input from './search-form-input';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { fetchLocation } from './../actions/index';
import './search-form.css';
import moment from 'moment';

export class SearchForm extends React.Component {
  onSubmit(values) {
    const location = values.location || '';
    const date = moment(values.date, 'YYYY-MM-DD').format('MM DD YYYY')
    return this.props.dispatch(
    fetchLocation(location, date))
  };
  render() {
    let searchError;
        if (this.props.searchError) {
          searchError = <div className="search-error">{this.props.searchError.message}</div>;
        }
    return (
      <form className={this.props.theme === 'night' ? 'search-form search-form-night' : 'search-form search-form-day'} onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <h2 className={this.props.theme === 'night' ? 'search-tides-title search-tides-title-night' : 'search-tides-title search-tides-title-day'}>SEARCH TIDES</h2>
        {searchError}
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
        <button className='search-form-button' type='submit'>SUBMIT</button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
  initialValues: { date: state.search.date },
  tideData: state.search.tideData,
  theme: state.theme.theme,
  searchError: state.search.error
  }
}

const searchForm = reduxForm({
  form: 'search',
})(SearchForm);

export default connect(mapStateToProps)(searchForm)
