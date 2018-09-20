import { NEW_LOCATION_ATTEMPT, NEW_LOCATION_REQUEST, NEW_LOCATION_SUCCESS, NEW_LOCATION_ERROR, REMOVE_LOCATION_REQUEST, REMOVE_LOCATION_SUCCESS, REMOVE_LOCATION_ERROR, ON_FAVORITES_ENDPOINT, OFF_FAVORITES_ENDPOINT } from './../actions/favorite';

const initialState = {
  onFavorites: false,
  loading: false,
  error: null,
  favoriteData: [],
  newFavorite: '',
  serverMessage: ''
};

export default function favoriteReducer(state=initialState, action) {
  if (action.type === NEW_LOCATION_ATTEMPT) {
    return Object.assign({}, state, {
      newFavorite: action.newFavorite
    });
  }
  if (action.type === NEW_LOCATION_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      serverMessage: 'This location is being added to your Favorites'
    });
  } else if (action.type === NEW_LOCATION_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      serverMessage: 'You have sucessfully added a new favorite!',
      error: null
    });
  } else if (action.type === NEW_LOCATION_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.err,
      serverMessage: 'SORRY This location was either not found OR not close enough to a United States coast to get accurate Tide Predictions. Please try another location.' 
    });
  } else if (action.type === REMOVE_LOCATION_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      serverMessage: 'We are removing this location from your favorites'
    });
  } else if (action.type === REMOVE_LOCATION_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      serverMessage: 'You have successfully removed this location from your favorites'
    });
  } else if (action.type === REMOVE_LOCATION_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === ON_FAVORITES_ENDPOINT) {
    return Object.assign({}, state, {
      onFavorites: true,
      error: null
    });
  } else if (action.type === OFF_FAVORITES_ENDPOINT) {
    return Object.assign({}, state, {
      onFavorites: false
    })
  }
  return state;
}