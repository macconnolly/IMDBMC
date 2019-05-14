import {
    FETCH_PROPERTY_ERROR,
    FETCH_PROPERTY_SUCCESS,
    UPDATE_SELECTED_MOVIE,
    IN_FLIGHT_START,
    IN_FLIGHT_STOP,
    FETCH_MOVIE_DETAILS,
    FETCH_MOVIE_DETAILS_SUCCESS,
    FETCH_MOVIE_DETAILS_ERROR,
    CREATE_MOVIE,
    CREATE_MOVIE_SUCCESS,
    CREATE_MOVIE_ERROR,
    LOGOUT_USER,
    FINISH_CREATE_REDIRECT,
    CREATE_REVIEW, CREATE_REVIEW_SUCCESS, CREATE_PROPERTY_SUCCESS
} from '../actions';

let initialState = {titles: [], loggedIn: false, createRedirect: false, inFlight: false, selectedOption: '', propertyList: []};
export default function(state = initialState, action) {
   // console.log('back to reducer' + JSON.stringify(action));
    switch(action.type) {
        case IN_FLIGHT_START:
            console.log('inflight start reducer');
            return { ...state, inFlight: true};
        case IN_FLIGHT_STOP:
            console.log('inflight stop reducer');
            return { ...state, inFlight: false};
        case FETCH_PROPERTY_SUCCESS:
            console.log('response data: ' + action.response);
            console.log(action.response.properties);
            return { ...state, titles: action.response.properties, };
        case FETCH_PROPERTY_ERROR:
            return { ...state, error:action.data };
        case UPDATE_SELECTED_MOVIE:
            console.log('Selected Reducer Movie: ' + JSON.stringify(action));
            return {...state, selectedOption: action.movieID};
        case FETCH_MOVIE_DETAILS:
            return { ...state, response: action.response};
        case CREATE_PROPERTY_SUCCESS:
            return { ...state, response: action.response, createRedirect: true };
        case LOGOUT_USER:
            return {...state, loggedIn: false};
        case CREATE_REVIEW:
            return { ...state, data: action.data };
        case CREATE_REVIEW_SUCCESS:
            return { ...state, response: action.response };
        case FINISH_CREATE_REDIRECT:
            return {...state, createRedirect: false };
        default:
            return state;
    }
}
