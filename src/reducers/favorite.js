import { NEW_LOCATION_ATTEMPT, NEW_LOCATION_REQUEST, NEW_LOCATION_SUCCESS, NEW_LOCATION_ERROR, REMOVE_LOCATION_REQUEST, REMOVE_LOCATION_SUCCESS, REMOVE_LOCATION_ERROR, ON_FAVORITES_ENDPOINT, OFF_FAVORITES_ENDPOINT, CHANGE_THEME_REQUEST, CHANGE_THEME_SUCCESS, CHANGE_THEME_ERROR, GET_THEME_REQUEST, GET_THEME_SUCCESS, GET_THEME_ERROR, SET_THEME_ON_LOGOUT } from './../actions/favorite';

const initialState = {
  onFavorites: false,
  loading: false,
  error: null,
  favoriteData: [],
  newFavorite: '',
  serverMessage: '',
  theme: 'day'
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
      serverMessage: 'You have sucessfully added a new favorite!'
    });
  } else if (action.type === NEW_LOCATION_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error,
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
  } else if (action.type === CHANGE_THEME_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      serverMessage: 'Setting your new theme'
    })
  } else if (action.type === CHANGE_THEME_SUCCESS) {
    if (state.theme === 'day') {
      return Object.assign({}, state, {
        theme: 'night',
        loading: false,
        error: null
      })
    } else if (state.theme === 'night') {
      return Object.assign({}, state, {
        theme: 'day',
        loading: false,
        error: null,
        serverMessage: ''
      })
    } 
  } else if (action.type === CHANGE_THEME_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error,
      serverMessage: 'Error'
    })
  }  else if (action.type === GET_THEME_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      serverMessage: 'Getting your theme'
    })
  } else if (action.type === GET_THEME_SUCCESS) {
    return Object.assign({}, state, {
      theme: action.theme,
      loading: false,
      error: null
    }) 
  } else if (action.type === GET_THEME_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error,
      serverMessage: 'Error'
    })
  } else if (action.type === SET_THEME_ON_LOGOUT) {
    return Object.assign({}, state, {
      theme: 'day'
    })
  }
  return state;
}