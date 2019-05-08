export const createPropertyService = (action) => {
    console.log('property service action data:');
    console.log(JSON.stringify(action.data));

    const PROPERTY_API_ENDPOINT = 'http://localhost:8080/properties';
    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.data)
    };

    return fetch(PROPERTY_API_ENDPOINT, parameters)
        .then(response => {
            console.log('property fetch callback json first response: ' + JSON.stringify(response));
            return response.json();
        })
        .then(json => {
            console.log('property fetch callback json response' + JSON.stringify(json));

            return json;
        });
};
