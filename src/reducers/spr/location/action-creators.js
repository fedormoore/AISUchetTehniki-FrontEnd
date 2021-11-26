import {TypeLocation} from "./types";
import type {AppDispatch} from "../rootReducer";
import {Request} from "../../../utils/network";

export const LocationActionCreators = {
    setLoadLocation: (payload) => ({type: TypeLocation.LOAD_LOCATION, payload}),
    setSaveLocation: (payload) => ({type: TypeLocation.SAVE_LOCATION, payload}),
    loadLocation: () => (dispatch: AppDispatch) => {
        dispatch(LocationActionCreators.setIsLoading(true));
        const auth = localStorage.getItem("token");
        return Request({
            url: "/app/spr/location",
            method: "GET",
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(LocationActionCreators.setLoadLocation(response));
                return {
                    isOk: true,
                    data:response
                };
            })
            .catch((error) => {
                return {
                    isOk: false
                };
            })
            .finally(() => {
                dispatch(LocationActionCreators.setIsLoading(false));
            });
    },
    saveLocation: (body) => (dispatch: AppDispatch) => {
        dispatch(LocationActionCreators.setIsSaving(true));
        const auth = localStorage.getItem("token");
        return Request({
            url: "/app/spr/location",
            method: "POST",
            body: JSON.stringify(body),
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(LocationActionCreators.setSaveLocation(response));
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
                dispatch(LocationActionCreators.setIsSaving(false));
            });
    },
    setIsLoading: (payload) => ({type: TypeLocation.SET_IS_LOADING, payload}),
    setIsSaving: (payload) => ({type: TypeLocation.SET_IS_SAVING, payload})
}