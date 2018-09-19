import { API_BASE_URL } from '../config';

export const FETCH_LOCATION_REQUEST = 'FETCH_LOCATION_REQUEST';
export const fetchLocationRequest = () => ({
  type: FETCH_LOCATION_REQUEST
});
export const FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS';
export const fetchLocationSuccess = (location) => ({
  type: FETCH_LOCATION_SUCCESS,
  tideData: location.extremes,
  city: location.city,
  state: location.state,
  date: location.date
});
export const FETCH_LOCATION_ERROR = 'FETCH_LOCATION_ERROR';
export const fetchLocationError = err => ({
  type: FETCH_LOCATION_ERROR,
  error: err
});

export const CHANGE_SEARCH_DATE = 'CHANGE_SEARCH_DATE';
export const changeSearchDate = (searchDate) => ({
  type: CHANGE_SEARCH_DATE,
  searchDate
});
export const CLEAR_TIDE_DATA = 'CLEAR_TIDE_DATA';
export const clearTideData = () => ({
  type: CLEAR_TIDE_DATA,
});

export const fetchLocation = (location, date) => dispatch => {
  dispatch(fetchLocationRequest());
  return fetch(`${API_BASE_URL}/location?location=${location}&date=${date}`)
  .then(res => {
      if (!res.ok) {
        return res.json().then(data => Promise.reject(data))
      }
      return res.json();
  })
  .then(location => {
    dispatch(fetchLocationSuccess(location));
  })
  .catch(err => {
    console.log('err', err)
    dispatch(fetchLocationError(err));
  });
}