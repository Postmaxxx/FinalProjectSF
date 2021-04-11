import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
//import initialState from './initialState';
import { applyMiddleware } from 'redux';
//import { middleware } from './middlewares/middleware.js';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));


export default store;