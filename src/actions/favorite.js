import {API_BASE_URL} from '../config';
import { loadAuthToken } from './../local-storage';

export const NEW_LOCATION_ATTEMPT = 'NEW_LOCATION_ATTEMPT';
export const newLocationAttempt = newFavorite => ({
  type: NEW_LOCATION_ATTEMPT,
  newFavorite
});
export const NEW_LOCATION_REQUEST = 'NEW_LOCATION_REQUEST';
export const newLocationRequest = () => ({
  type: NEW_LOCATION_REQUEST
});
export const NEW_LOCATION_SUCCESS = 'NEW_LOCATION_SUCCESS';
export const newLocationSuccess = () => ({
  type: NEW_LOCATION_SUCCESS
});
export const NEW_LOCATION_ERROR = 'NEW_LOCATION_ERROR';
export const newLocationError = err => ({
  type: NEW_LOCATION_ERROR,
  err
});
export const REMOVE_LOCATION_REQUEST = 'REMOVE_LOCATION_REQUEST';
export const removeLocationRequest = () => ({
  type: REMOVE_LOCATION_REQUEST
});
export const REMOVE_LOCATION_SUCCESS = 'REMOVE_LOCATION_SUCCESS';
export const removeLocationSuccess = () => ({
  type: REMOVE_LOCATION_SUCCESS
});
export const REMOVE_LOCATION_ERROR = 'REMOVE_LOCATION_ERROR';
export const removeLocationError = err => ({
  type: REMOVE_LOCATION_ERROR,
  err
});
export const ON_FAVORITES_ENDPOINT = 'ON_FAVORITES_ENDPOINT';
export const onFavoritesEndpoint = () => ({
  type: ON_FAVORITES_ENDPOINT
});
export const OFF_FAVORITES_ENDPOINT = 'OFF_FAVORITES_ENDPOINT';
export const offFavoritesEndpoint = () => ({
  type: OFF_FAVORITES_ENDPOINT
});
export const CHANGE_THEME_REQUEST = 'CHANGE_THEME_REQUEST';
export const changeThemeRequest = () => ({
  type: CHANGE_THEME_REQUEST
})
export const CHANGE_THEME_SUCCESS = 'CHANGE_THEME_SUCCESS';
export const changeThemeSuccess = theme => ({
  type: CHANGE_THEME_SUCCESS,
  theme
});
export const CHANGE_THEME_ERROR = 'CHANGE_THEME_ERROR';
export const changeThemeError = err => ({
  type: CHANGE_THEME_ERROR,
  err
});
export const GET_THEME_REQUEST = 'GET_THEME_REQUEST';
export const getThemeRequest = () => ({
  type: GET_THEME_REQUEST,
});
export const GET_THEME_SUCCESS = 'GET_THEME_SUCCESS';
export const getThemeSuccess = theme => ({
  type: GET_THEME_SUCCESS,
  theme
});
export const GET_THEME_ERROR = 'GET_THEME_ERROR';
export const getThemeError = err => ({
  type: GET_THEME_ERROR,
  err
});
export const SET_THEME_ON_LOGOUT = 'SET_THEME_ON_LOGOUT';
export const setThemeOnLogout = () => ({
  type: SET_THEME_ON_LOGOUT
});

export const addNewLocation = newFavorite => dispatch => {
  dispatch(newLocationAttempt(newFavorite));
  dispatch(newLocationRequest());
  const authToken = loadAuthToken();
  //  GUIDENCE WITH ACCOUNTING FOR NO AUTH TOKEN FOUND
  // 
  return fetch(`${API_BASE_URL}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({newFavorite})
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(data => Promise.reject(data))
    }
    return res.json();
  })
  .then(({data}) => dispatch(newLocationSuccess(data)))
  .catch(err => {
    dispatch(newLocationError(err));
  });
}
export const deleteFavorite = id => dispatch => {
  dispatch(removeLocationRequest())
  const authToken = loadAuthToken();
  return fetch(`${API_BASE_URL}/favorites/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(() => dispatch(removeLocationSuccess()))
  .catch(err => {
    dispatch(removeLocationError(err))
  })
}

export const setOnFavorites = () => dispatch => {
  dispatch(onFavoritesEndpoint());
};

export const changeTheme = toggleTheme => dispatch => {
  dispatch(changeThemeRequest());
  const authToken = loadAuthToken();
  return fetch(`${API_BASE_URL}/user-theme`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({toggleTheme})
  })
  .then(res => res.json())
  .then((data) => {
    dispatch(changeThemeSuccess(data.theme));
  })
  .catch(err => {
    dispatch(changeThemeError(err))
  })
}
export const fetchTheme = () => dispatch => {
  dispatch(getThemeRequest());
  const authToken = loadAuthToken();
  return fetch(`${API_BASE_URL}/user-theme`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then((data) => {
    dispatch(getThemeSuccess(data.theme));
  })
  .catch(err => {
    dispatch(getThemeError(err))
  })
}
