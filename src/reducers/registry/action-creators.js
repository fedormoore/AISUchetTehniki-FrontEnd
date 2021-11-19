import {TypeRegistry} from "./types";
import type {AppDispatch} from "../rootReducer";
import Request from "../../utils/network";

export const RegistryActionCreators = {
    setLoadRegistry: (payload) => ({type: TypeRegistry.LOAD_REGISTRY, payload}),
    setSaveRegistry: (payload) => ({type: TypeRegistry.SAVE_REGISTRY, payload}),
    loadRegistry: () => (dispatch: AppDispatch) => {
        dispatch(RegistryActionCreators.setIsLoading(true));
        const auth = localStorage.getItem("token");
        Request({
            url: "/app/registry",
            method: "GET",
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(RegistryActionCreators.setLoadRegistry(response));
            })
            .catch((error) => {
                console.log("error")
            })
            .finally(() => {
                dispatch(RegistryActionCreators.setIsLoading(false));
            });
    },
    saveRegistry: (body) => (dispatch: AppDispatch) => {
        dispatch(RegistryActionCreators.setIsSaving(true));
        const auth = localStorage.getItem("token");
        return Request({
            url: "/app/registry",
            method: "POST",
            body: JSON.stringify(body),
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(RegistryActionCreators.setSaveRegistry(response));
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
                dispatch(RegistryActionCreators.setIsSaving(false));
            });
    },
    setIsLoading: (payload) => ({type: TypeRegistry.SET_IS_LOADING, payload}),
    setIsSaving: (payload) => ({type: TypeRegistry.SET_IS_SAVING, payload})
}