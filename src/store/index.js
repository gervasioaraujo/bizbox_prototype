import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './ducks/auth';

const rootReducer = combineReducers({
    authReducer
});

const configStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configStore;