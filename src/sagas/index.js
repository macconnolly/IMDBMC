import { fork } from 'redux-saga/effects';

import { watchUserAuthentication, watchMovies } from "./watchers";



export default function *sagas() {
  yield fork(watchUserAuthentication);
  yield fork(watchMovies);

}