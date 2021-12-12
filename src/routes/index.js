// import Login from "../pages/auth/Login";
// import Registration from "../pages/auth/Registration";
// import Home from "../pages/Home";
// import Main from "../pages/Main";
// import User from "../pages/spr/User";
// import DeviceType from "../pages/spr/DeviceType";
// import Location from "../pages/spr/Location";
// import Device from "../pages/spr/Device";
// import Counterparty from "../pages/spr/Counterparty";
// import UserReport from "../pages/report/UserReport";
// import Income from "../pages/doc/Income";
// import Registry from "../pages/registry/Registry";
// import LocationRegistryReport from "../pages/report/LocationRegistryReport";
// import BudgetAccount from "../pages/spr/BudgetAccount";
import React from "react";

const Login = React.lazy(() => import("../pages/auth/Login"));
const Registration = React.lazy(() => import("../pages/auth/Registration"));
const Home = React.lazy(() => import("../pages/Home"));

const Main = React.lazy(() => import("../pages/Main"));
const User = React.lazy(() => import("../pages/spr/User"));
const Location = React.lazy(() => import("../pages/spr/Location"));
const DeviceType = React.lazy(() => import("../pages/spr/DeviceType"));
const Device = React.lazy(() => import("../pages/spr/Device"));
const Counterparty = React.lazy(() => import("../pages/spr/Counterparty"));
const BudgetAccount = React.lazy(() => import("../pages/spr/BudgetAccount"));
const Income = React.lazy(() => import("../pages/doc/Income"));
const Registry = React.lazy(() => import("../pages/registry/Registry"));
const UserReport = React.lazy(() => import("../pages/report/UserReport"));
const LocationRegistryReport = React.lazy(() => import("../pages/report/LocationRegistryReport"));

export const routeNames = {
    HOME : '/home',
    LOGIN : '/login',
    REGISTRATION : '/registration',
    MAIN : '/main',
    USER: '/user',
    LOCATION: '/location',
    DEVICE_TYPE: '/device_type',
    DEVICE: '/device',
    COUNTERPARTY: '/counterparty',
    INCOME: '/income',
    REGISTRY: '/registry',
    REPORT_LOCATION_REGISTRY: '/report_location_registry',
    REPORT_USER: '/report_user',
    BUDGET_ACCOUNT: '/budget_account'
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
        component: Location
    },
    {
        path: routeNames.DEVICE_TYPE,
        exact: true,
        component: DeviceType
    },
    {
        path: routeNames.DEVICE,
        exact: true,
        component: Device
    },
    {
        path: routeNames.COUNTERPARTY,
        exact: true,
        component: Counterparty
    },
    {
        path: routeNames.BUDGET_ACCOUNT,
        exact: true,
        component: BudgetAccount
    },
    {
        path: routeNames.INCOME,
        exact: true,
        component: Income
    },
    {
        path: routeNames.REGISTRY,
        exact: true,
        component: Registry
    },
    {
        path: routeNames.REPORT_USER,
        exact: true,
        component: UserReport
    },
    {
        path: routeNames.REPORT_LOCATION_REGISTRY,
        exact: true,
        component: LocationRegistryReport
    },
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