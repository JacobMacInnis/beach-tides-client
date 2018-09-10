import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchLocation } from './../actions/index';
import {Redirect, Link} from 'react-router-dom';

class TideResults extends React.Component {
  render() {
    console.log()
    return (
      <div>
        <Link to="/">NEW SEARCH</Link>
        <h1>HEY</h1>
        <p>TIDE RESULTS</p>
      </div>
    )
  }
}     

const mapStateToProps = state => ({
  tideData: state.search.extremes
}) 

export default withRouter(connect(mapStateToProps)(TideResults))
