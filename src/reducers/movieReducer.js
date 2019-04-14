import {
    FETCH_MOVIE_ERROR,
    FETCH_MOVIE_SUCCESS,
    UPDATE_SELECTED_MOVIE,
    IN_FLIGHT_START,
    IN_FLIGHT_STOP,
    FETCH_MOVIE_DETAILS,
    FETCH_MOVIE_DETAILS_SUCCESS,
    FETCH_MOVIE_DETAILS_ERROR,
    CREATE_MOVIE,
    CREATE_MOVIE_SUCCESS,
    CREATE_MOVIE_ERROR
        } from '../actions';

let initialState = {titles: [], inFlight: false, selectedOption: '' };
export default function(state = initialState, action) {
   // console.log('back to reducer' + JSON.stringify(action));
    switch(action.type) {
        case IN_FLIGHT_START:
            console.log('inflight start reducer');
            return { ...state, inFlight: true};
        case IN_FLIGHT_STOP:
            console.log('inflight stop reducer');
            return { ...state, inFlight: false};
        case FETCH_MOVIE_SUCCESS:
            //console.log('response data: ' + action.response);
            return { ...state, titles: action.response };
        case FETCH_MOVIE_ERROR:
            return { ...state, error:action.data };
        case UPDATE_SELECTED_MOVIE:
            console.log('Selected Reducer Movie: ' + JSON.stringify(action));
            return {...state, selectedOption: action.movieID};
        case FETCH_MOVIE_DETAILS:
            return { ...state, response: action.response};
        case CREATE_MOVIE_SUCCESS:
            return { ...state, response: action.response };
        default:
            return state;
    }
}
