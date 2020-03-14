import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;

