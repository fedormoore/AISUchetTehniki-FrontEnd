import {TypeAuth} from "./types";
import type {AppDispatch} from "../rootReducer";
import Request from "../../utils/network";

export const AuthActionCreators = {
    setIsLoading: (payload) => ({type: TypeAuth.SET_IS_LOADING, payload}),
    setError: (payload) => ({type: TypeAuth.SET_ERROR, payload}),
    setInfo: (payload) => ({type: TypeAuth.SET_INFO, payload}),
    setUser: (user) => ({type: TypeAuth.SET_USER, payload: user}),
    setIsAuth: (auth) => ({type: TypeAuth.SET_AUTH, payload: auth}),
    login: (body) => (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setIsLoading(true));

        Request({
            url: "/auth/signIn",
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                localStorage.setItem("auth", true);
                localStorage.setItem("token", response.token);
                dispatch(AuthActionCreators.setUser("mockUser"));
                dispatch(AuthActionCreators.setIsAuth(true))
            })
            .catch((error) => {
                dispatch(AuthActionCreators.setError(error.message));
            })
            .finally(() => {
                dispatch(AuthActionCreators.setIsLoading(false));
            });
    },
    registration: (body) => (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setError(''));
        dispatch(AuthActionCreators.setIsLoading(true));

        return Request({
            url: "/auth/signUp",
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                return {
                    isOk: true
                };
            })
            .catch((error) => {
                dispatch(AuthActionCreators.setError(error.message));
                return {
                    isOk: false
                };
            })
            .finally(() => {
                dispatch(AuthActionCreators.setIsLoading(false));
            });
    },
    logout: () => (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('token')
        dispatch(AuthActionCreators.setUser({}));
        dispatch(AuthActionCreators.setIsAuth(false))
    }
}