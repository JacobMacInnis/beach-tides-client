import moment from 'moment';
import { FETCH_LOCATION_REQUEST, FETCH_LOCATION_SUCCESS, FETCH_LOCATION_ERROR } from "../actions";

const initialState = {
  date: moment().format('YYYY-MM-DD'),
  lat: '',
  lon: '',
  loading: false,
  error: null
};

export default function locationReducer(state = initialState, action) {
  if (action.type = FETCH_LOCATION_REQUEST) {
    Object.assign({}, state, {loading: true})
  } else if (action.type = FETCH_LOCATION_SUCCESS) {
    Object.assign({}, state, {loading: false, error: null})
  } else if (action.type = FETCH_LOCATION_ERROR) {
    Object.assign({}, state, {loading: false, error: action.error})
  }
    return state;
}