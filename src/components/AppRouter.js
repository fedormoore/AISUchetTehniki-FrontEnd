import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {privateRoutes, publicRoutes, routeNames} from "../routes";
import {useSelector} from "react-redux";

const AppRouter = () => {

    const isAuth = useSelector(state => state.auth.isAuth)

    return (
        isAuth ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route path={route.path} exact={route.exact} component={route.component} key={route.path}/>
                )}
                <Redirect to={routeNames.MAIN}/>
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route path={route.path} exact={route.exact} component={route.component} key={route.path}/>
                )}
                <Redirect to={routeNames.HOME}/>
            </Switch>
    );
};

export default AppRouter;