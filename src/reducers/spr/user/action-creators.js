import {TypeUser} from "./types";
import type {AppDispatch} from "../rootReducer";
import Request from "../../../utils/network";

export const UserActionCreators = {
    setInfo: (payload) => ({type: TypeUser.SET_INFO, payload}),
    setError: (payload) => ({type: TypeUser.SET_ERROR, payload}),
    setLoadUser: (payload) => ({type: TypeUser.LOAD_USER, payload}),
    setSaveUser: (payload) => ({type: TypeUser.SAVE_USER, payload}),
    loadUser: () => (dispatch: AppDispatch) => {
        dispatch(UserActionCreators.setIsLoading(true));
        const auth = localStorage.getItem("token");
        Request({
            url: "/app/spr/user",
            method: "GET"
        })
            .then((response) => {
                // console.log(response.status)
                // if (response.status!==200){
                //     dispatch(UserActionCreators.setError(response.message));
                //     console.log(response)
                //     return;
                // }
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
        dispatch(UserActionCreators.setIsLoading(true));
        const auth = localStorage.getItem("token");
        Request({
            url: "/app/spr/user",
            method: "POST",
            body: JSON.stringify(body),
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                // console.log(response.status)
                // if (response.status!==200){
                //     dispatch(UserActionCreators.setError(response.message));
                //     console.log(response)
                //     return;
                // }
                dispatch(UserActionCreators.setSaveUser(response));
            })
            .catch((error) => {
                console.log("error")
            })
            .finally(() => {
                dispatch(UserActionCreators.setIsLoading(false));
            });
    },
    setIsLoading: (payload) => ({type: TypeUser.SET_IS_LOADING, payload})
}