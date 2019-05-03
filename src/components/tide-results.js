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
    let { tideData, theme, city, state,  }= this.props;
    if (tideData !== undefined) {
      tidesDisplay = this.handleTidesDisplay(tideData, theme);
    } else  {
      return <Redirect to='/' />;
    }
    return (
      <div className='tide-results-container'>
        {tideData.length > 0 ? <div className={theme === 'night' ? 'search-tide-results search-tide-results-night' : 'search-tide-results search-tide-results-day'}>
          <h1 className='city-state'>{`${city}, ${state}`}</h1>
          <h5>UPCOMING TIDES</h5>
          <button className='remove-search-results' onClick={() => this.handleClearTideData()} >X</button>
          <div className='row'>
            {tidesDisplay}
          </div>
        </div> : ''}
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
