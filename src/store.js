import {createStore, applyMiddleware, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension';

// Import reducers
import locationReducer from './reducers/index';
import authReducer from './reducers/auth';
import protectedReducer from './reducers/protected';
import favoriteReducer from './reducers/favorite';
import themeReducer from './reducers/theme';

export default createStore(
    combineReducers({
        form: formReducer,
        search: locationReducer,
        auth: authReducer,
        protected: protectedReducer,
        favorite: favoriteReducer,
        theme: themeReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
);