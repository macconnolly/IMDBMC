
import {
    FETCH_PROPERTY_SUCCESS,
    FETCH_PROPERTY_ERROR,
    FETCH_PROPERTIES,
    UPDATE_SELECTED_MOVIE,
    IN_FLIGHT_START,
    IN_FLIGHT_STOP,
    FETCH_MOVIE_DETAILS,
    FETCH_MOVIE_DETAILS_SUCCESS,
    FETCH_MOVIE_DETAILS_ERROR,
    CREATE_MOVIE,
    CREATE_REVIEW,
    CREATE_REVIEW_SUCCESS,
    FINISH_CREATE_REDIRECT
} from "./index";

export function createNewMovieAction(data, token){
    return {
        type: CREATE_MOVIE,
        data, token
    }
}

export const inFlightStart = () => {
    console.log('in flight start reducer');
    return {
        type: IN_FLIGHT_START
    }
};

export const inFlightStop = () => {
    return {
        type: IN_FLIGHT_STOP
    }
};
export const fetchAllProperties = () => {
    return {
        type: FETCH_PROPERTIES
    }
};

export function getAllMoviesSuccess(data) {
    return {
        type: FETCH_PROPERTY_SUCCESS,
        data
    };
}

export function getAllMoviesError(data){
    return {
        type: FETCH_PROPERTY_ERROR,
        data
    }
}

export function updateSelectedMovie(movieID){
    return {
        type: UPDATE_SELECTED_MOVIE,
        movieID
    }
}

export function getMovieDetails(data, token){
    return {
        type: FETCH_MOVIE_DETAILS, data, token
    }
}
export function getMovieDetailsSuccess(data){
    return {
        type: FETCH_MOVIE_DETAILS_SUCCESS, data
    }
}

export function getMovieDetailsError(data){
    return {
        type: FETCH_MOVIE_DETAILS_ERROR, data
    }
}

export function finishCreateMovie(){
    return {
        type: FINISH_CREATE_REDIRECT
    }
}

export function createReview(data, token) {
    return{
        type: CREATE_REVIEW, data, token
    }
}

export function createReviewSuccess() {
    return{
        type: CREATE_REVIEW_SUCCESS
    }
}



