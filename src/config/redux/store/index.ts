import {createStore, applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';
import FlipperDebug from 'redux-flipper';
import rootReducer from '../reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(Thunk)),
);

export default store;
