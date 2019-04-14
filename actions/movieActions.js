
import {
    FETCH_MOVIE_SUCCESS,
    FETCH_MOVIE_ERROR,
    FETCH_MOVIES,
    UPDATE_SELECTED_MOVIE,
    IN_FLIGHT_START,
    IN_FLIGHT_STOP,
    FETCH_MOVIE_DETAILS,
    FETCH_MOVIE_DETAILS_SUCCESS,
    FETCH_MOVIE_DETAILS_ERROR,
    CREATE_MOVIE
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

export const fetchAllMovies = (token) => {
    return {
        type: FETCH_MOVIES, token
    }
};

export function getAllMoviesSuccess(data) {
    return {
        type: FETCH_MOVIE_SUCCESS,
        data
    };
}

export function getAllMoviesError(data){
    return {
        type: FETCH_MOVIE_ERROR,
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



