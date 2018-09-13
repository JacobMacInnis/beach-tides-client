import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { fetchProtectedData } from '../actions/protected-data';
import { addNewLocation, deleteFavorite } from './../actions/favorite';
import requiresLogin from './requires-login';
import './favorites.css';

class Favorites extends React.Component {
    componentDidMount() {
      this.props.dispatch(fetchProtectedData());
    }
    handleSubmitClick = (e) => {
      const newFavorite = this.newFavorite.value;
      e.preventDefault();
      this.props.dispatch(addNewLocation(newFavorite))
      .then(() => {
        this.props.dispatch(fetchProtectedData());
      })
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
      let favoritesResults;
      if (this.props.favoritesData.length > 0) {
        favoritesResults = this.props.favoritesData.map((favObj, index) => {
          return (
            <div className={favObj.city} key={index}>
              <h3>{`${favObj.city}, ${favObj.state}`} <button id={favObj._id} value={favObj._id} onClick={target => this.handleRemoveFavorite(target)}>X</button></h3>
              <h4>UPCOMING TIDES</h4>
              { favObj.extremes.map((extreme, i) => {
                return <li key={i}>{this.localDateTimeMachine(extreme.dt)} : {extreme.type.toUpperCase()}</li>
                })
              }
            </div>
          )
        })
      } else {
        favoritesResults = <h2>YOU CURRENTLY DO NOT HAVE ANY FAVORITE LOCATIONS SAVED</h2>
      }
        console.log(this.props.favoritesData, 'fav', this.props.isAuthenticated);
        if (this.props.isAuthenticated === false) {
          return <Redirect to="/" />;
        }
        return (
            <div className="favorites">
                <h2>FAVORITE LOCATIONS</h2>
                <form className='new-favorite-form' >
                  <label htmlFor='new-favorite-input'>ENTER ZIPCODE or CITY FOLLOWED BY COMMA AND TWO LETTER STATE CODE</label>
                  <input name='new-favorite-input' type='text' ref={input => this.newFavorite = input} placeholder='ZIPCODE OR CITY AND STATE'></input>
                  <button type='submit' onClick={this.handleSubmitClick}>SUBMIT</button>
                </form>
                <div className='favorite-results'>
                  {favoritesResults}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    favoritesData: state.protected.data,
    isAuthenticated: state.auth.isAuthenticated
    };
};

export default requiresLogin()(connect(mapStateToProps)(Favorites));