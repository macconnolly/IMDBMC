import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom' // react-router v4
import { ConnectedRouter } from 'connected-react-router'

import configureStore, { history } from './store/configureStore';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import PrivateRoute from './container/privateRoute'
import LoginPage from './components/loginPage';
import RegisterPage from './components/registerPage';
import CreateMovieContainer from './container/createMovieContainer';
import MovieHeader from "./components/movieHeader";
import MovieOverview from './container/movieOverview';
import MovieForm from './components/movieForm';


const store = configureStore();

ReactDOM.render(
    <Provider store={store}>

                <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
                    <BrowserRouter>
                        <MovieHeader />
                        <Switch>
                            <Route path='/' exact component={LoginPage} />
                            <Route path='/login' component={LoginPage} />
                            <Route path='/register' component={RegisterPage} />
                            <PrivateRoute path="/movies" component={MovieOverview} />
                            <PrivateRoute path='/movie/create' exact component={CreateMovieContainer}/>
                            <PrivateRoute path='/new/movie' exact component={MovieForm}/>
                        </Switch>
                    </BrowserRouter>
        </ConnectedRouter>

    </Provider>,
    document.getElementById('root')
)