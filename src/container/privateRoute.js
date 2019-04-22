import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { checkCookie } from '../utils/cookies';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route { ...rest } render={props => (
        Cookies.get() !== undefined ? (
            <Component { ...props } />
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}
            />
        )
    )} />
);

export default PrivateRoute;