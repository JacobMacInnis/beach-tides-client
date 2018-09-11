import {createStore, applyMiddleware, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import locationReducer from './reducers/index';
import authReducer from './reducers/auth';

import thunk from 'redux-thunk';

export default createStore(
    combineReducers({
        form: formReducer,
        search: locationReducer,
        auth: authReducer
    }),
    applyMiddleware(thunk)
);