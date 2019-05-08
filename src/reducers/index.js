import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import register from './registerReducer';
import login from './loginReducer';
import property from './propertyReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  register, login, property
});

