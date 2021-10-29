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
            body: JSON.stringify(body)
        })
            .then((response) => {
                console.log(response)
                if (response.status!==200){
                    dispatch(AuthActionCreators.setError(response.message));
                }
                localStorage.setItem("auth", true);
                localStorage.setItem("token", response.token);

                dispatch(AuthActionCreators.setUser("mockUser"));
                dispatch(AuthActionCreators.setIsAuth(true))

            })
            .catch((error) => {
                console.log("error")
            })
            .finally(() => {
                console.log("finally")
                dispatch(AuthActionCreators.setIsLoading(false));
            });
    },
    registration: (body) => (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setError(''));
        dispatch(AuthActionCreators.setIsLoading(true));

        Request({
            url: "/auth/signUp",
            method: "POST",
            body: JSON.stringify(body)
        })
            .then((response) => {
                if (response.status!==200){
                    dispatch(AuthActionCreators.setError(response.message));
                    return;
                }
                dispatch(AuthActionCreators.setInfo(response.message));

            })
            .catch((error) => {
                dispatch(AuthActionCreators.setError(error.message));
            })
            .finally(() => {
                console.log("finally")
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