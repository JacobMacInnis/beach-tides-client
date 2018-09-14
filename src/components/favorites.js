import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import FormFavorites from './form-favorites';
import { fetchProtectedData } from '../actions/protected-data';
import { deleteFavorite, setOnFavorites, offFavoritesEndpoint } from './../actions/favorite';
import requiresLogin from './requires-login';
import './favorites.css';
import moment from 'moment';

class Favorites extends React.Component {
    componentDidMount() {
      this.props.dispatch(setOnFavorites())
      // NOT WORKING
      this.props.dispatch(fetchProtectedData())
    }
    componentWillUnmount() {
      this.props.dispatch(offFavoritesEndpoint());
    }
    // handleSubmitClick = (e) => {
    //   const newFavorite = this.newFavorite.value;
    //   e.preventDefault();
    //   this.props.dispatch(addNewLocation(newFavorite))
    //   .then(() => {
    //     this.props.dispatch(fetchProtectedData());
    //   })
    // }
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
            const thisDate =  moment(this.localDateTimeMachine(tide.dt)).format('YYYY MM DD');
            if (currentDate === null || currentDate !== thisDate) {
              currentDate = thisDate;
              groupedTides.push([]);
            }
            groupedTides[groupedTides.length - 1].push(tide);
          } 
          let singleTide;
          const tidesDisplay = groupedTides.map((tidesArray, index) => {
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
          return (
            <div className='location-results' key={index}>
              <h2>{`${favObj.city}, ${favObj.state}`} <button id={favObj._id} value={favObj._id} onClick={target => this.handleRemoveFavorite(target)}>X</button></h2>
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
            <div className="favorites">
                <h2>FAVORITE LOCATIONS</h2>
                <FormFavorites /> 
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


