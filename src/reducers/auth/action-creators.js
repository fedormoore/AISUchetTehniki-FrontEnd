import {TypeAuth} from "./types";
import type {AppDispatch} from "../rootReducer";
import {Request} from "../../http/network";

export const AuthActionCreators = {
    setIsLoading: (payload) => ({type: TypeAuth.SET_IS_LOADING, payload}),
    setError: (payload) => ({type: TypeAuth.SET_ERROR, payload}),
    setInfo: (payload) => ({type: TypeAuth.SET_INFO, payload}),
    setUser: (user) => ({type: TypeAuth.SET_USER, payload: user}),
    setIsAuth: (auth) => ({type: TypeAuth.SET_AUTH, payload: auth}),
    login: (body) => (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setError(''));
        dispatch(AuthActionCreators.setIsLoading(true));

        Request({
            url: "/auth/signIn",
            method: "POST",
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (response.isOk) {
                    localStorage.setItem("isAuth", true);
                    localStorage.setItem("accessToken", response.data.accessToken);
                    localStorage.setItem("refreshToken", response.data.refreshToken);
                    dispatch(AuthActionCreators.setUser("mockUser"));
                    dispatch(AuthActionCreators.setIsAuth(true))
                } else {
                    dispatch(AuthActionCreators.setError(response.data));
                }
            })
            .finally(() => {
                dispatch(AuthActionCreators.setIsLoading(false));
            })
    },
    registration: (body) => (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setError(''));
        dispatch(AuthActionCreators.setIsLoading(true));

        return dispatch(Request({
            url: "/auth/signUp",
            method: "POST",
            body: JSON.stringify(body)
        }))
            .then((response) => {
                if (response.isOk) {
                    return response;
                } else {
                    dispatch(AuthActionCreators.setError(response.data));
                }
            })
            .finally(() => {
                dispatch(AuthActionCreators.setIsLoading(false));
            })
    },
    logout: () => (dispatch: AppDispatch) => {
        localStorage.removeItem('isAuth')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        dispatch(AuthActionCreators.setUser({}));
        dispatch(AuthActionCreators.setIsAuth(false))
    }
}