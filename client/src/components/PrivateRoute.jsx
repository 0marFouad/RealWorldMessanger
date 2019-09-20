import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import authentication from '../services/authentication';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authentication.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            console.log("Redirect to Sign in");
            return <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
);