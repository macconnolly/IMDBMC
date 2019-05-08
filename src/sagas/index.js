import { fork } from 'redux-saga/effects';

import { watchUserAuthentication, watchMovies, watchPropertyFormChange } from "./watchers";



export default function *sagas() {
  yield fork(watchUserAuthentication);
  yield fork(watchMovies);
  yield fork(watchPropertyFormChange)

}
