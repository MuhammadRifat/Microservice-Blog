import React from 'react';
import { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { userContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [loggedInUser] = useContext(userContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.email ? (      // checking user already loggedIn or not
                children
                ) : (
                <Redirect                   // Redirect to login page
                    to={{
                    pathname: "/login",
                    state: { from: location }
                }}
                />
            )
        }
        />
    );
};

export default PrivateRoute;