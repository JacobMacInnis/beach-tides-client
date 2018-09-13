import {API_BASE_URL} from '../config';

export const fetchLocation = (location, date) => dispatch => {
  return fetch(`${API_BASE_URL}/location?location=${location}&date=${date}`)
  .then(res => {
      return res.json()
  })
  .then(location => {
    dispatch(fetchLocationSuccess(location));
  })
  .catch(err => {
    console.log(err, 'ERROR GET LOCATION')
  });
}

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
export const fetchLocationError = () => ({
  type: FETCH_LOCATION_ERROR
});

export const CHANGE_SEARCH_DATE = 'CHANGE_SEARCH_DATE';
export const changeSearchDate = (searchDate) => ({
  type: CHANGE_SEARCH_DATE,
  searchDate
})