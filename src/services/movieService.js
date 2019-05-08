import { push, replace } from 'connected-react-router'
export const getAllMoviesService = (token) => {
    const MOVIE_API_ENDPOINT = 'https://csc3916-hw4.herokuapp.com/movies?reviews=true';
    const parameters = {
        method: 'GET',
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        }
    };

    return fetch(MOVIE_API_ENDPOINT, parameters)
        .then(response => {
            //console.log('service json first response: ' + JSON.stringify(response));
            return response.json();
        })
        .then(json => {
            //console.log('Service json response' + JSON.stringify(json));
            return json;
        });
};


export const getMovieDetailsService = (response, ...params) => {
    //console.log('property service call');
    const MOVIE_API_ENDPOINT = 'https://csc3916-hw4.herokuapp.com/movies';
    const parameters = {
        method: 'GET',
        headers: {
            'Authorization': params.token,
            'Content-Type': 'application/json'
        }
    };

    return fetch(MOVIE_API_ENDPOINT, parameters)
        .then(response => {
            //console.log('service json first response: ' + JSON.stringify(response));
            return response.json();
        })
        .then(json => {
            //console.log('Service json response' + JSON.stringify(json));
            return json;
        })
        ;
};

export const createMovieService = (action) => {
    console.log('property service action data:');
    console.log(JSON.stringify(action.data));
    console.log(JSON.stringify(action.token));

    const MOVIE_API_ENDPOINT = 'https://csc3916-hw4.herokuapp.com/movies';
    const parameters = {
        method: 'POST',
        headers: {
            'Authorization': action.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.data)
    };

    return fetch(MOVIE_API_ENDPOINT, parameters)
        .then(response => {
            console.log('service json first response: ' + JSON.stringify(response));
            return response.json();
        })
        .then(json => {
            console.log('Service json response' + JSON.stringify(json));

            return json;
        })

        ;
};


export const createReviewService = (action) => {
    console.log('review service action data:');
    console.log(JSON.stringify(action.data));
    console.log(JSON.stringify(action.token));

    const REVIEW_API_ENDPOINT = 'https://csc3916-hw4.herokuapp.com/reviews';
    const parameters = {
        method: 'PUT',
        headers: {
            'Authorization': action.token.toString(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.data)
    };

    return fetch(REVIEW_API_ENDPOINT, parameters)
        .then(response => {
            console.log('review json first response: ' + JSON.stringify(response));
            return response.json();
        })
        .then(json => {
            console.log('review json response' + JSON.stringify(json));

            return json;
        })

        ;
};
