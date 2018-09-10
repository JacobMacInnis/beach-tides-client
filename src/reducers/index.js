import moment from 'moment';
import { FETCH_LOCATION_REQUEST, FETCH_LOCATION_SUCCESS, FETCH_LOCATION_ERROR } from "../actions";

const initialState = {
  date: moment().format('YYYY-MM-DD'),
  searchDate: '2018-10-30',
  lat: '',
  lon: '',
  loading: false,
  error: null,
  tideData: []
};

export default function locationReducer(state = initialState, action) {
  if (action.type === FETCH_LOCATION_REQUEST) {
    return Object.assign({}, state, {loading: true})
  } else if (action.type === FETCH_LOCATION_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      error: null,
      tideData: action.tideData
    })
  } else if (action.type === FETCH_LOCATION_ERROR) {
    return Object.assign({}, state, {loading: false, error: action.error})
  }
    return state;
}