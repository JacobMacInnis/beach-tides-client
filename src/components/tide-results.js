import React from 'react';
import './tide-results.css';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import SearchForm from './search-form';
import { clearTideData } from './../actions/index';

import { tidesDisplay } from './../custom-functions';

export class TideResults extends React.Component {

  handleClearTideData() {
    this.props.dispatch(clearTideData());
  }
  handleTidesDisplay(tidesData, theme) {
    return tidesDisplay(tidesData, theme);
  }
  render() {
    let tidesDisplay;
    if (this.props.tideData !== undefined) {
      tidesDisplay = this.handleTidesDisplay(this.props.tideData, this.props.theme);
    } else  {
      return <Redirect to='/' />;
    }
    return (
      <div className='tide-results-container'>
        <div className={this.props.theme === 'night' ? 'search-tide-results search-tide-results-night' : 'search-tide-results search-tide-results-day'}>
          <h1 className='city-state'>{`${this.props.city}, ${this.props.state}`}</h1>
          <h5>UPCOMING TIDES</h5>
          <button className='remove-search-results' onClick={() => this.handleClearTideData()} >X</button>
          <div className='row'>
            {tidesDisplay}
          </div>
        </div>
        <SearchForm />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    tideData: state.search.tideData,
    city: state.search.city,
    state: state.search.state,
    searchDate: state.search.searchDate,
    theme: state.theme.theme,
  };
} ;

export default withRouter(connect(mapStateToProps)(TideResults));
