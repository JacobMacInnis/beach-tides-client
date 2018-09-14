import moment from 'moment';
import { FETCH_LOCATION_REQUEST, FETCH_LOCATION_SUCCESS, FETCH_LOCATION_ERROR } from "../actions";

const initialState = {
  date: moment().format('YYYY-MM-DD'),
  searchDate: '',
  loading: false,
  error: null,
  tideData: [],
  city: '',
  state: '',
  serverMessage: null
};

export default function locationReducer(state = initialState, action) {
  if (action.type === FETCH_LOCATION_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === FETCH_LOCATION_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      error: null,
      tideData: action.tideData,
      city:  action.city,
      state: action.state,
      searchDate: action.date
    });
  } else if (action.type === FETCH_LOCATION_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      tideData: [],
      error: action.error, 
      serverMessage: 'SORRY This location was either not found OR not close enough to a United States coast to get accurate Tide Predictions. Please try another location.' 
    });
  }
    return state;
}