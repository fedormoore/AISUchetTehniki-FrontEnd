import {TypeUser} from "./types";
import type {AppDispatch} from "../rootReducer";
import {Request} from "../../../http/network";

export const UserActionCreators = {
    setLoadUser: (payload) => ({type: TypeUser.LOAD_USER, payload}),
    setSaveUser: (payload) => ({type: TypeUser.SAVE_USER, payload}),
    loadUser: () => (dispatch: AppDispatch) => {
        dispatch(UserActionCreators.setIsLoading(true));
        return dispatch(Request({
            url: "/app/spr/user",
            method: "GET",
        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(UserActionCreators.setLoadUser(response.data));
                }
            })
            .finally(() => {
                dispatch(UserActionCreators.setIsLoading(false));
            });
    },
    saveUser: (body) => (dispatch: AppDispatch) => {
        dispatch(UserActionCreators.setIsSaving(true));
        return dispatch(Request({
            url: "/app/spr/user",
            method: "POST",
            body: JSON.stringify(body),
        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(UserActionCreators.setSaveUser(response.data));
                    return {
                        isOk: true
                    };
                } else {
                    return {
                        isOk: false,
                        message: response.data
                    };
                }
            })
            .finally(() => {
                dispatch(UserActionCreators.setIsSaving(false));
            });
    },
    setIsLoading: (payload) => ({type: TypeUser.SET_IS_LOADING, payload}),
    setIsSaving: (payload) => ({type: TypeUser.SET_IS_SAVING, payload})
}