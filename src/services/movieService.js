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
    //console.log('movie service call');
    const MOVIE_API_ENDPOINT = 'https://csc3916-hw4.herokuapp.com/movies';
    const parameters = {
        method: 'GET',
        headers: {
            'Authorization':'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYjdmODhkMWUyYTIyMDAwNDE5MzE2MSIsInVzZXJuYW1lIjoiZ2Ftb3JhNTUiLCJpYXQiOjE1NTQ3NzE3NDR9.3p8CwLFxhdq0_3iQ9JskekJfyPk2eVQRNTmh3u2BjgE',
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
    console.log('movie service action data:');
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