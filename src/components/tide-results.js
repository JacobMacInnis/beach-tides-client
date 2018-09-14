import React from 'react';
import './tide-results.css';
import {connect} from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import moment from 'moment';

class TideResults extends React.Component {
  
  localDateTimeMachine(epoch) {
    const myDate = new Date( epoch * 1000 );
    return myDate.toLocaleString()
  }
  
  render() {
    let tidesDisplay;
    console.log(this.props.tideData, 'huh?')
    if (this.props.tideData.length > 0) {
      const tideData = this.props.tideData;
      let currentDate = null;
      const groupedTides = [];
      for (let i = 0; i < tideData.length; i++) {
        const tide = tideData[i];
        const thisDate =  moment(this.localDateTimeMachine(tide.dt)).format('YYYY MM DD');
        console.log(thisDate)
        if (currentDate === null || currentDate !== thisDate) {
          currentDate = thisDate;
          groupedTides.push([]);
        }
        groupedTides[groupedTides.length - 1].push(tide);
      } 
      console.log(groupedTides);
      let singleTide;
      tidesDisplay = groupedTides.map((tidesArray, index) => {
        let day;
        day = this.localDateTimeMachine(tidesArray[0].dt);
        day = moment(day).format('dddd, MMMM Do');
        return (
          <div className='tideDisplay' key={index}>
            <h3>{day}</h3>
            <div >{singleTide = tidesArray.map((tide, i) => {
              return <p key={i}>{tide.type} Tide at {moment(this.localDateTimeMachine(tide.dt)).format('h:mm a')}</p>
            })
          }</div>
          </div>
        )
      })
    } else  {
      return <Redirect to='/' />
    }
    return (
      <div className='tide-results'>
        <a href="/">NEW SEARCH</a>
        <div className='city-state-header'>
          <h3 className='city-state'>{`${this.props.city}, ${this.props.state}`}</h3>
          <h5>UPCOMING TIDES</h5>
        </div>
        <div>
          {tidesDisplay}
        </div>
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
