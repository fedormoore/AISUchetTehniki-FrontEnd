import {TypeUser} from "./types";
import type {AppDispatch} from "../rootReducer";
import Request from "../../../utils/network";

export const UserActionCreators = {
    setLoadUser: (payload) => ({type: TypeUser.LOAD_USER, payload}),
    setSaveUser: (payload) => ({type: TypeUser.SAVE_USER, payload}),
    loadUser: () => (dispatch: AppDispatch) => {
        dispatch(UserActionCreators.setIsLoading(true));
        const auth = localStorage.getItem("token");
        Request({
            url: "/app/spr/user",
            method: "GET",
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(UserActionCreators.setLoadUser(response));
            })
            .catch((error) => {
                console.log("error")
            })
            .finally(() => {
                dispatch(UserActionCreators.setIsLoading(false));
            });
    },
    saveUser: (body) => (dispatch: AppDispatch) => {
        dispatch(UserActionCreators.setIsSaving(true));
        const auth = localStorage.getItem("token");
        return Request({
            url: "/app/spr/user",
            method: "POST",
            body: JSON.stringify(body),
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(UserActionCreators.setSaveUser(response));
                return {
                    isOk: true
                };
            })
            .catch((error) => {
                return {
                    isOk: false,
                    message: error.message
                };
            })
            .finally(() => {
                dispatch(UserActionCreators.setIsSaving(false));
            });
    },
    setIsLoading: (payload) => ({type: TypeUser.SET_IS_LOADING, payload}),
    setIsSaving: (payload) => ({type: TypeUser.SET_IS_SAVING, payload})
}