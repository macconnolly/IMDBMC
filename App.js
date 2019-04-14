import React, { Component } from 'react';
import MovieHeader from './components/movieHeader';
import './App.css';

export default class App extends Component {
  render() {
    return(
        <div>
          <MovieHeader />
          {this.props.children}
        </div>
    );
  }
}