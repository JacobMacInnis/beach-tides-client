import React from 'react';
import './tide-results.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { withRouter, Redirect } from 'react-router-dom';

class TideResults extends React.Component {
  render() {
    console.log(this.props.tideData, this.props.searchDate, 'HEY')
    if (this.props.searchDate === undefined || this.props.tideData === undefined || this.props.tideData.length < 1 || this.props.searchDate.length === 0) {
      return <Redirect to='/' />
    }
    const tideData = [...this.props.tideData];
    const tideResults1 = [];
    const tideResults2 = [];
    const tideResults3 = [];
    let tideDay = Number(`${tideData[0].date[8]}${tideData[0].date[9]}`)
    for(let i = 0; i < this.props.tideData.length; i++){
      if(Number(`${tideData[i].date[8]}${tideData[i].date[9]}`) === tideDay) {
        tideResults1.push(
          `<li key=tide-${i}>
            <span>AT ${tideData[i].date[11]}${tideData[i].date[12]}:${tideData[i].date[14]}${tideData[i].date[15]} The TIDE WILL BE ${tideData[i].type}</span></li>`
        )
      }
      else if (Number(`${tideData[i].date[8]}${tideData[i].date[9]}`) > tideDay && Number(`${tideData[i].date[8]}${tideData[i].date[9]}`) < (tideDay + 2)) {
        tideResults2.push(
        `<li key=tide-${i}>
            <span>AT ${tideData[i].date[11]}${tideData[i].date[12]}:${tideData[i].date[14]}${tideData[i].date[15]} The TIDE WILL BE ${tideData[i].type}</span>
          </li>`)
      } else {
        tideResults3.push(
          `<li key=${`tide-${i}`}>
              <span>${` AT ${tideData[i].date[11]}${tideData[i].date[12]}:${tideData[i].date[14]}${tideData[i].date[15]}`} The TIDE WILL BE {tideData[i].type}</span>
            </li>`)
      }
    }
  
      return (
        <div className='tide-results'>
          <a href="/">NEW SEARCH</a>
          <h3>{`${this.props.city}, ${this.props.state}`}</h3>
          <h3>{}</h3>
          <h4>UPCOMMING TIDES</h4>
          <ul className='tide-list1'>
            {tideResults1[0]}
          </ul>
          <ul className='tide-list2'>
            {tideResults2}
          </ul>
          <ul className='tide-list3'>
            {tideResults3}
          </ul>
        </div>
      )
    }
  } 
   

const mapStateToProps = state => {
  // console.log(state)
  return {
    tideData: state.search.tideData,
    city: state.search.city,
    state: state.search.state,
    searchDate: state.search.searchDate
  }
} 

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default withRouter(connect(mapStateToProps)(TideResults))
