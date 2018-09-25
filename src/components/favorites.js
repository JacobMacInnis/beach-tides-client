import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FormFavorites from './form-favorites';
import { fetchProtectedData } from '../actions/protected-data';
import { deleteFavorite, setOnFavorites, offFavoritesEndpoint } from './../actions/favorite';
import { fetchTheme } from './../actions/theme';
import './favorites.css';
import moment from 'moment';

export class Favorites extends React.Component {
    componentDidMount() {
      this.props.dispatch(setOnFavorites());
      this.props.dispatch(fetchTheme());
      this.props.dispatch(fetchProtectedData());
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
      return myDate.toLocaleString();
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
            let daysCount = groupedTides.length + 1;
            let day;
            day = this.localDateTimeMachine(tidesArray[0].dt).split(',')[0];
            day = moment(day, 'MM DD YYYY').format('dddd, MMMM Do');
            return (
              <div className={this.props.theme === 'night' ? `tide-display-night col-4${daysCount}` : `tide-display-day col-${daysCount}`} key={index}>
                <h3>{day}</h3>
                <div >{tidesArray.map((tide, i) => {
                  return <p key={i}>{tide.type} Tide at {moment(this.localDateTimeMachine(tide.dt), 'h:mm a').format('h:mm a')}</p>
                })
                }</div>
              </div>
            )
          })
          return (
            <div className={this.props.theme === 'night' ? 'location-results location-results-night' : 'location-results location-results-day'} key={index}>
              <h2>{`${favObj.city}, ${favObj.state}`} </h2><button className='remove-favorite' id={favObj._id} value={favObj._id} onClick={target => this.handleRemoveFavorite(target)}>X</button>
              <h4>UPCOMING TIDES</h4>
              <div className='row'>
                {tidesDisplay}
              </div>
            </div>
          )
        })
      } else if (this.props.loading) {
        favoritesDisplay = <h2>Loading Your Favorite Tide Predictions</h2>;
      } else {
        favoritesDisplay = <h2>YOU CURRENTLY DO NOT HAVE ANY FAVORITE LOCATIONS SAVED</h2>
      } if (this.props.isAuthenticated === false) {
          return <Redirect to="/" />;
        }
        return (
          <div className="favorites-container">
              {/* <Theme /> */}
              <div className={this.props.theme === 'night' ? 'favorites-header-night' : 'favorites-header-day'}>
                <h2 className='favorites-title'>MY LOCATIONS</h2>
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
    loading: state.protected.loading,
    theme: state.theme.theme
    };
};

export default connect(mapStateToProps)(Favorites);


