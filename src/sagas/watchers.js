import {takeLatest, put, take, takeEvery} from 'redux-saga/effects';
import { registerSaga, loginSaga } from './authenticationSaga';
import {getAllMoviesSaga, getMovieDetails, createNewMovieSaga, updateSelectedMovie, createNewReviewSaga} from "./movieSaga";

import {FETCH_PROPERTIES, LOGIN_USER, REGISTER_USER,
  UPDATE_SELECTED_MOVIE,
  FETCH_MOVIE_DETAILS,
  CREATE_MOVIE,
  CREATE_REVIEW,
  CREATE_PROPERTY

} from '../actions';
import {createNewPropertySaga} from "./propertySaga";

export function* watchUserAuthentication() {
  yield takeLatest(REGISTER_USER, registerSaga);
  yield takeLatest(LOGIN_USER, loginSaga);
}

export function* watchMovies() {

  yield takeLatest(FETCH_PROPERTIES, getAllMoviesSaga);
  yield takeLatest(CREATE_MOVIE, createNewMovieSaga);
  yield takeEvery(CREATE_REVIEW, createNewReviewSaga);
  //yield takeLatest(UPDATE_SELECTED_MOVIE, updateSelectedMovie);
  // yield take(UPDATE_SELECTED_MOVIE)
  //yield put(CREATE_MOVIE, createNewMovie);
  //yield takeLatest(FETCH_MOVIE_DETAILS, getMovieDetails)
}

// export function* createMovie() {
//   yield takeLatest(CREATE_MOVIE, createNewMovie)
// }

export function* watchPropertyFormChange() {

  yield takeLatest(CREATE_PROPERTY, createNewPropertySaga);
  // yield takeLatest(CREATE_MOVIE, createNewMovieSaga);
  // yield takeEvery(CREATE_REVIEW, createNewReviewSaga);
  //yield takeLatest(UPDATE_SELECTED_MOVIE, updateSelectedMovie);
  // yield take(UPDATE_SELECTED_MOVIE)
  //yield put(CREATE_MOVIE, createNewMovie);
  //yield takeLatest(FETCH_MOVIE_DETAILS, getMovieDetails)
}
