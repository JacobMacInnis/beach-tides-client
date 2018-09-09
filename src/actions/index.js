import {API_BASE_URL} from '../config';


export const fetchLocation = (location, date) => dispatch => {
  return fetch(`${API_BASE_URL}/location?location=${location}`)
  .then(res => {
      res.json()
      console.log('RESPONSE', res);
      dispatch(fetchLocationSuccess(res));
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
export const fetchLocationSuccess = ( location) => ({
  type: FETCH_LOCATION_SUCCESS,
  lat: location.lat,
  lon: location.lon
});
export const FETCH_LOCATION_ERROR = 'FETCH_LOCATION_ERROR';
export const fetchLocationError = () => ({
  type: FETCH_LOCATION_ERROR
});