import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Registration extends React.Component {
  render() {
    // const tideResults = this.props.tideData.map((tide, index) => {
    //   return <li>

    //   </li>
    // })
    return (
      <div>
        <Link to="/">NEW SEARCH</Link>
        <a href="/auth/google">Sign In with Google</a>
        <ul>
          {/* {tideResults} */}
        </ul>
      </div>
    )
  }
}     

const mapStateToProps = state => ({
  tideData: state.search.extremes
}) 

export default withRouter(connect(mapStateToProps)(Registration))
