import Login from "../pages/auth/Login";
import Registration from "../pages/auth/Registration";
import Home from "../pages/Home";
import Main from "../pages/Main";
import User from "../pages/spr/User";

export const routeNames = {
    HOME : '/home',
    LOGIN : '/login',
    REGISTRATION : '/registration',
    MAIN : '/main',
    USER: '/user',
    LOCATION: '/location',
    DEVICE_TYPE: '/device_type',
    DEVICE: '/device',
    PROVIDER: '/provider'
}

export const privateRoutes = [
    {
        path: routeNames.MAIN,
        exact: true,
        component: Main
    },
    {
        path: routeNames.USER,
        exact: true,
        component: User
    },
    {
        path: routeNames.LOCATION,
        exact: true,
        component: Main
    },
    {
        path: routeNames.DEVICE_TYPE,
        exact: true,
        component: Main
    },
    {
        path: routeNames.DEVICE,
        exact: true,
        component: Main
    },
    {
        path: routeNames.PROVIDER,
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