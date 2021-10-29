import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Home from "../pages/Home";
import Main from "../pages/Main";

export const routeNames = {
    HOME : '/home',
    LOGIN : '/login',
    REGISTRATION : '/registration',
    MAIN : '/main'
}

export const privateRoutes = [
    {
        path: routeNames.MAIN,
        exact: true,
        component: Main
    }
];

export const publicRoutes = [
    {
        path: routeNames.HOME,
        exact: true,
        component: Home
    },
    {
        path: routeNames.LOGIN,
        exact: true,
        component: Login
    },
    {
        path: routeNames.REGISTRATION,
        exact: true,
        component: Registration
    }
];