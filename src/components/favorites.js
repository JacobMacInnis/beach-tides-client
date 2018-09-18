import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import FormFavorites from './form-favorites';
import Theme from './theme';
import { fetchProtectedData, unSetRedirect } from '../actions/protected-data';
import { deleteFavorite, setOnFavorites, offFavoritesEndpoint, fetchTheme } from './../actions/favorite';
import requiresLogin from './requires-login';
import './favorites.css';
import moment from 'moment';

class Favorites extends React.Component {
    componentDidMount() {
      this.props.dispatch(setOnFavorites());
      this.props.dispatch(fetchTheme());
      this.props.dispatch(fetchProtectedData());
      this.props.dispatch(unSetRedirect())
    }
    componentWillUnmount() {
      this.props.dispatch(offFavoritesEndpoint());
    }
    handleRemoveFavorite = value => {
      this.props.dispatch(deleteFavorite(value.target.id))
      .then(() => {
        this.props.dispatch(fetchProtectedData());
      })
    }
    localDateTimeMachine(epoch) {
      const myDate = new Date( epoch * 1000 );
      return myDate.toLocaleString()
    }
    render() {
      let favoritesData = this.props.favoritesData;
      let favoritesDisplay;
      if (favoritesData.length > 0) {
        favoritesDisplay = favoritesData.map((favObj, index) => {
          const groupedTides = [];
          let currentDate = null;
          for (let i = 0; i < favObj.extremes.length; i++) {
            const tide = favObj.extremes[i];
            const time = this.localDateTimeMachine(tide.dt).split(',')[0]
            const thisDate =  moment(time, 'MM DD YYYY').format('YYYY MM DD');
            if (currentDate === null || currentDate !== thisDate) {
              currentDate = thisDate;
              groupedTides.push([]);
            }
            groupedTides[groupedTides.length - 1].push(tide);
          } 
          const tidesDisplay = groupedTides.map((tidesArray, index) => {
            let day;
            day = this.localDateTimeMachine(tidesArray[0].dt).split(',')[0];
            day = moment(day, 'MM DD YYYY').format('dddd, MMMM Do');
            return (
              <div className='tideDisplay' key={index}>
                <h3>{day}</h3>
                <div >{tidesArray.map((tide, i) => {
                  return <p key={i}>{tide.type} Tide at {moment(this.localDateTimeMachine(tide.dt), 'h:mm a').format('h:mm a')}</p>
                })
                }</div>
              </div>
            )
          })
          return (
            <div className='location-results' key={index}>
              <h2>{`${favObj.city}, ${favObj.state}`} <button className='remove-favorite' id={favObj._id} value={favObj._id} onClick={target => this.handleRemoveFavorite(target)}>X</button></h2>
              <h4>UPCOMING TIDES</h4>
              {tidesDisplay}
            </div>
          )
        })
      } else if (this.props.loading) {
        favoritesDisplay = <h2>Loading Your Favorite Tide Predictions</h2>
      } else {
        favoritesDisplay = <h2>YOU CURRENTLY DO NOT HAVE ANY FAVORITE LOCATIONS SAVED</h2>
      } if (this.props.isAuthenticated === false) {
          return <Redirect to="/" />;
        }
        return (
          <div className="favorites-container">
              <Theme />
              <div className='favorites-header'>
                <h2 className='favorites-title'>FAVORITE LOCATIONS</h2>
                <FormFavorites /> 
              </div>
              <div className='favorite-results'>
                {favoritesDisplay}
              </div>
          </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    favoritesData: state.protected.data,
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.protected.loading
    };
};

export default requiresLogin()(connect(mapStateToProps)(Favorites));


