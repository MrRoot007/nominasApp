import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useStateValue } from '../../../context/store';

function RouteSecure({ component: Component, ...rest }) {
    const [{ sessionUser }, dispatch] = useStateValue();
    console.log(sessionUser);
    return (
        <Route
            {...rest}
            render={(props) =>
                sessionUser ? (
                    sessionUser.authenticated == true ? (
                        <Component {...props} {...rest} />
                    )
                        : <Redirect to="/auth/login" />
                ) : <Redirect to="/auth/login" />
            }
        />
    );
}

export default RouteSecure;