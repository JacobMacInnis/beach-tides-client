import {API_BASE_URL} from '../config';


export const fetchLocation = (location, date) => dispatch => {
  return fetch(`${API_BASE_URL}location?location=${location}`)
  .then(res => {
      return res.json()
  })
  .then(res => {
    
    // location = { lat: res.latitude, lon: res.longitude, city: res.city, state: res.state }
    console.log(res)

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
export const fetchLocationSuccess = ( location) => ({
  type: FETCH_LOCATION_SUCCESS,
  lat: location.lat,
  lon: location.lon
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