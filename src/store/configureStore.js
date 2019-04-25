import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension';


import rootSaga from '../sagas';

export const history = createBrowserHistory();
export const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState) => {
  return {
    ...createStore(createRootReducer(history), initialState, composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history)))),
    runSaga: sagaMiddleware.run(rootSaga)
  }
};


export default configureStore;

