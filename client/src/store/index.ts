import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { userReducer, chatReducer } from './reducers';

const reducers = combineReducers({ userReducer, chatReducer });

export const store = createStore(reducers, applyMiddleware(thunk));