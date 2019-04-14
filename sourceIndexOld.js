
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';


import { Router, Route, HashRouter, ConnectedRouter} from 'react-router-dom';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './container/App';
import rootReducer from './reducers';
import rootSaga from './sagas';
import './index.css';
import { MovieContainer, MovieDetail, StarDetail } from './containers';
import { DisplayMsg } from './components';

//const loggerMiddleware = createLogger();
const routeMiddleware = routerMiddleware(hashHistory);
let store = createStore(movieApp, composeWithDevTools(
    applyMiddleware(thunkMiddleware, routeMiddleware)));
const history = syncHistoryWithStore(hashHistory,store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} >
            <Route path="/" component={App}>
                <Route path="/movie/:id" component={MovieDetail} />
                <Route path="/star/:id" component={StarDetail} />
                <Route path="/search/:keyword" component={MovieContainer} />
                <Route path="*" component={DisplayMsg} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
