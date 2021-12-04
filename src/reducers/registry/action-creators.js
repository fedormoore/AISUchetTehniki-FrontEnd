import {TypeRegistry} from "./types";
import type {AppDispatch} from "../rootReducer";
import {Request} from "../../http/network";

export const RegistryActionCreators = {
    setLoadRegistry: (payload) => ({type: TypeRegistry.LOAD_REGISTRY, payload}),
    setSaveRegistry: (payload) => ({type: TypeRegistry.SAVE_REGISTRY, payload}),
    loadRegistry: () => (dispatch: AppDispatch) => {
        dispatch(RegistryActionCreators.setIsLoading(true));
        dispatch(Request({
            url: "/app/registry",
            method: "GET",
        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(RegistryActionCreators.setLoadRegistry(response.data));
                    return {
                        isOk: true,
                        data:response.data
                    };
                }
            })
            .finally(() => {
                dispatch(RegistryActionCreators.setIsLoading(false));
            });
    },
    saveRegistry: (body) => (dispatch: AppDispatch) => {
        dispatch(RegistryActionCreators.setIsSaving(true));

        return dispatch( Request({
            url: "/app/registry",
            method: "POST",
            body: JSON.stringify(body),

        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(RegistryActionCreators.setSaveRegistry(response.data));
                    return {
                        isOk: true
                    };
                }else {
                    return {
                        isOk: false,
                        message: response.data
                    };
                }
            })
            .finally(() => {
                dispatch(RegistryActionCreators.setIsSaving(false));
            });
    },
    setIsLoading: (payload) => ({type: TypeRegistry.SET_IS_LOADING, payload}),
    setIsSaving: (payload) => ({type: TypeRegistry.SET_IS_SAVING, payload})
}