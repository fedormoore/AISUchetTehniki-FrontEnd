import {TypeDeviceType} from "./types";
import type {AppDispatch} from "../rootReducer";
import Request from "../../../utils/network";

export const DeviceTypeActionCreators = {
    setLoadDeviceType: (payload) => ({type: TypeDeviceType.LOAD_DEVICE_TYPE, payload}),
    setSaveDeviceType: (payload) => ({type: TypeDeviceType.SAVE_DEVICE_TYPE, payload}),
    loadDeviceType: () => (dispatch: AppDispatch) => {
        dispatch(DeviceTypeActionCreators.setIsLoading(true));
        // const auth = localStorage.getItem("token");
        Request({
            url: "/app/spr/device_type",
            method: "GET"
        })
            .then((response) => {
                dispatch(DeviceTypeActionCreators.setLoadDeviceType(response));
            })
            .catch((error) => {
                console.log("error")
            })
            .finally(() => {
                dispatch(DeviceTypeActionCreators.setIsLoading(false));
            });
    },
    saveDeviceType: (body) => (dispatch: AppDispatch) => {
        dispatch(DeviceTypeActionCreators.setIsSaving(true));
        const auth = localStorage.getItem("token");
        return Request({
            url: "/app/spr/device_type",
            method: "POST",
            body: JSON.stringify(body),
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(DeviceTypeActionCreators.setSaveDeviceType(response));
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
                dispatch(DeviceTypeActionCreators.setIsSaving(false));
            });
    },
    setIsLoading: (payload) => ({type: TypeDeviceType.SET_IS_LOADING, payload}),
    setIsSaving: (payload) => ({type: TypeDeviceType.SET_IS_SAVING, payload})
}