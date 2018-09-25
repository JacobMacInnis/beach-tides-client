import { REACT_APP_API_BASE_URL } from '../config';
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

export const addNewLocation = newFavorite => dispatch => {
  dispatch(newLocationAttempt(newFavorite));
  dispatch(newLocationRequest());
  const authToken = loadAuthToken();
  return fetch(`${REACT_APP_API_BASE_URL}/favorites`, {
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
  return fetch(`${REACT_APP_API_BASE_URL}/favorites/${id}`, {
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