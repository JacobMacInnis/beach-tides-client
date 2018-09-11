import {createStore, applyMiddleware, combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import locationReducer from './reducers/index';
import authReducer from './reducers/auth';
import protectedReducer from './reducers/protected';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension';

export default createStore(
    combineReducers({
        form: formReducer,
        search: locationReducer,
        auth: authReducer,
        protected: protectedReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
);