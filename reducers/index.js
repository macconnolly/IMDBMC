import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import register from './registerReducer';
import login from './loginReducer';
import movie from './movieReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  register, login, movie
});
