import {combineReducers} from 'redux';
import authReducer from './authReducer';
import itemReducer from './itemReducer';
import cartReducer from './cartReducer';
import favoReducer from './favReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  item: itemReducer,
  cart: cartReducer,
  favorite: favoReducer,
});

export default rootReducer;
