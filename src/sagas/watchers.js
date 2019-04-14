import {takeLatest, put, take, takeEvery} from 'redux-saga/effects';
import { registerSaga, loginSaga } from './authenticationSaga';
import {getAllMoviesSaga, getMovieDetails, createNewMovieSaga, updateSelectedMovie} from "./movieSaga";

import {FETCH_MOVIES, LOGIN_USER, REGISTER_USER,
  UPDATE_SELECTED_MOVIE,
  FETCH_MOVIE_DETAILS,
  CREATE_MOVIE

} from '../actions';

export function* watchUserAuthentication() {
  yield takeLatest(REGISTER_USER, registerSaga);
  yield takeLatest(LOGIN_USER, loginSaga);
}

export function* watchMovies() {

  yield takeEvery(FETCH_MOVIES, getAllMoviesSaga);
  yield takeLatest(CREATE_MOVIE, createNewMovieSaga);
  //yield takeLatest(UPDATE_SELECTED_MOVIE, updateSelectedMovie);
  // yield take(UPDATE_SELECTED_MOVIE)
  //yield put(CREATE_MOVIE, createNewMovie);
  //yield takeLatest(FETCH_MOVIE_DETAILS, getMovieDetails)
}

// export function* createMovie() {
//   yield takeLatest(CREATE_MOVIE, createNewMovie)
// }