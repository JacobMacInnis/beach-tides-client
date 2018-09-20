import React from 'react';
import './tide-results.css';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import SearchForm from './search-form'
import { clearTideData } from './../actions/index';
// npm moment package
import moment from 'moment';

export class TideResults extends React.Component {
  
  localDateTimeMachine(epoch) {
    const myDate = new Date( epoch * 1000 );
    return myDate.toLocaleString()
  }
  handleClearTideData() {
    this.props.dispatch(clearTideData());
  }

  render() {
    let tidesDisplay;
    if (this.props.tideData !== undefined && this.props.tideData.length > 0 ) {
      const tideData = this.props.tideData;
      let currentDate = null;
      const groupedTides = [];
      for (let i = 0; i < tideData.length; i++) {
        const tide = tideData[i];
        const thisDate =  moment(this.localDateTimeMachine(tide.dt).split(',')[0], 'MM DD YYYY').format('YYYY MM DD');
        if (currentDate === null || currentDate !== thisDate) {
          currentDate = thisDate;
          groupedTides.push([]);
        }
        groupedTides[groupedTides.length - 1].push(tide);
      } 
      tidesDisplay = groupedTides.map((tidesArray, index) => {
        
        let day;
        day = this.localDateTimeMachine(tidesArray[0].dt).split(',')[0];
        day = moment(day,'MM DD YYYY').format('dddd, MMMM Do');
        return (
          <div className={this.props.theme === 'night' ? 'tide-display-night col-4' : 'tide-display-day col-4'} key={index}>
            <h3 className='tide-results-date'>{day}</h3>
            <div>{tidesArray.map((tide, i) => {
              return <p key={i}><strong>{tide.type}</strong> Tide at {moment(this.localDateTimeMachine(tide.dt).split(',')[1], 'h:mm a').format('h:mm a')}</p>
            })
          }</div>
          </div>
        )
      })
    } else  {
      return <Redirect to='/' />
    }
    return (
      <div className='tide-results-container'>
        <div className={this.props.theme === 'night' ? 'search-tide-results-night' : 'search-tide-results-day'}>
          <h1 className='city-state'>{`${this.props.city}, ${this.props.state}`}</h1>
          <h5>UPCOMING TIDES</h5>
          <button className='remove-search-results' onClick={() => this.handleClearTideData()} >X</button>
          <div className='row'>
            {tidesDisplay}
          </div>
        </div>
        <SearchForm />
      </div>
    )
  }
} 
const mapStateToProps = state => {
  return {
    tideData: state.search.tideData,
    city: state.search.city,
    state: state.search.state,
    searchDate: state.search.searchDate,
    theme: state.theme.theme,
  }
} 

export default withRouter(connect(mapStateToProps)(TideResults))
