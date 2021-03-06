import {put, call} from 'redux-saga/effects';
import { push, replace } from 'connected-react-router'

import { getAllMoviesService, getMovieDetailsService, createMovieService, createReviewService } from '../services/movieService';

import {FETCH_PROPERTY_SUCCESS, FETCH_PROPERTY_ERROR, UPDATE_SELECTED_MOVIE, IN_FLIGHT_START, IN_FLIGHT_STOP, CREATE_MOVIE, CREATE_MOVIE_SUCCESS, CREATE_MOVIE_ERROR} from '../actions'

import * as types from "../actions";
import {loginUserService} from "../services/authenticationService";

export function* getAllMoviesSaga(action) {
    try {
        console.log('get all movies sags');

        const response = yield call(getAllMoviesService);
        yield put({ type: FETCH_PROPERTY_SUCCESS, response })

            //put(push('/movies'))
            //put({type: IN_FLIGHT_STOP})
        ;
    } catch(error) {
        yield put({ type: FETCH_PROPERTY_ERROR, error });
    }
}

export function* getMovieDetails() {
    try {
        console.log('property details saga');
        //yield put({ type: IN_FLIGHT_START});
        const response = yield call(getMovieDetailsService);
        yield [
            put({ type: FETCH_PROPERTY_SUCCESS, response }),
            //put({type: IN_FLIGHT_STOP})
        ];
    } catch(error) {
        yield put({ type: FETCH_PROPERTY_ERROR, error });
    }
}
// export function* createNewMovie(data) {
//     try {
//         console.log('create property  saga');
//         //yield put({ type: CREATE_MOVIE}, data);
//         const response = yield call(createNewMovie(data));
//         yield [
//             put({ type: CREATE_MOVIE_SUCCESS, response }),
//             console.log('created successfuklly')
//             //put({type: IN_FLIGHT_STOP})
//         ];
//     } catch(error) {
//         yield put({ type: FETCH_PROPERTY_ERROR, error });
//     }
// }


export function* createNewMovieSaga(action) {
    try {
        console.log('create property saga');
        const response = yield call(createMovieService, action);
        yield [
            put({ type: types.CREATE_MOVIE_SUCCESS, response }),


        ];
        push('/movies')
    } catch(error) {
        yield put({ type: types.CREATE_MOVIE_ERROR, error })
    }
}

export function* createNewReviewSaga(action) {
    try {
        console.log('create review saga');
        const response = yield call(createReviewService, action);
        yield [
            put({ type: types.CREATE_REVIEW_SUCCESS, response }),


        ];

    } catch(error) {
        yield put({ type: types.CREATE_REVIEW_ERROR, error })
    }
}



// export function* updateSelectedMovie(movieID) {
//     console.log('updating selected property in saga: ');
//     console.log(JSON.stringify(movieID.movieID));
//     try {
//         yield [
//             //put({ type: UPDATE_SELECTED_MOVIE, movieID }),
//             put(push('/movies/#/' + movieID.movieID))
//         ];
//     } catch(error) {
//         yield put({ type: FETCH_PROPERTY_ERROR, error });
//     }
// }

