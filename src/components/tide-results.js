import React from 'react';
import './tide-results.css';
import {connect} from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import moment from 'moment';
import SearchForm from './search-form'

class TideResults extends React.Component {
  
  localDateTimeMachine(epoch) {
    const myDate = new Date( epoch * 1000 );
    return myDate.toLocaleString()
  }
  render() {
    let tidesDisplay;
    if (this.props.tideData.length > 0) {
      const tideData = this.props.tideData;
      let currentDate = null;
      const groupedTides = [];
      for (let i = 0; i < tideData.length; i++) {
        const tide = tideData[i];
        const thisDate =  moment(this.localDateTimeMachine(tide.dt)).format('YYYY MM DD');
        if (currentDate === null || currentDate !== thisDate) {
          currentDate = thisDate;
          groupedTides.push([]);
        }
        groupedTides[groupedTides.length - 1].push(tide);
      } 
      tidesDisplay = groupedTides.map((tidesArray, index) => {
        let singleTide;
        let day;
        day = this.localDateTimeMachine(tidesArray[0].dt);
        day = moment(day).format('dddd, MMMM Do');
        return (
          <div className='tideDisplay' key={index}>
            <h3 className='tide-results-date'>{day}</h3>
            <div >{singleTide = tidesArray.map((tide, i) => {
              return <p key={i}><strong>{tide.type}</strong> Tide at {moment(this.localDateTimeMachine(tide.dt)).format('h:mm a')}</p>
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
        <div className='search-tide-results'>
          <h1 className='city-state'>{`${this.props.city}, ${this.props.state}`}</h1>
          <h5>UPCOMING TIDES</h5>
          <div>
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
    searchDate: state.search.searchDate
  }
} 

export default withRouter(connect(mapStateToProps)(TideResults))
