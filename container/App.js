import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import PrivateRoute from './privateRoute';
import LoginPage from '../components/loginPage';
import RegisterPage from '../components/registerPage';
import CreateMovieContainer from './createMovieContainer';
import MovieHeader from "../components/movieHeader";

import MovieOverview from './movieOverview';

class App extends Component {
  render() {
    return (


      <BrowserRouter>
        <div className='wrapper'>
        <header>
          <MovieHeader />
        </header>
        <div>
                  <Switch>
                    <Route path='/' exact component={LoginPage} />
                    <Route path='/login' component={LoginPage} />
                    <Route path='/register' component={RegisterPage} />
                    <PrivateRoute path='/movies' exact component={MovieOverview} />
                    <PrivateRoute path='/movies/create' component={CreateMovieContainer}/>
                  </Switch>

          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;