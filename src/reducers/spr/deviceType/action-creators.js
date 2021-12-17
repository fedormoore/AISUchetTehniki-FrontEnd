import {TypeDeviceType} from "./types";
import type {AppDispatch} from "../rootReducer";
import {Request} from "../../../http/network";

export const DeviceTypeActionCreators = {
    setLoadDeviceType: (payload) => ({type: TypeDeviceType.LOAD_DEVICE_TYPE, payload}),
    setSaveDeviceType: (payload) => ({type: TypeDeviceType.SAVE_DEVICE_TYPE, payload}),
    loadDeviceType: () => (dispatch: AppDispatch) => {
        dispatch(DeviceTypeActionCreators.setIsLoading(true));

        dispatch(Request({
            url: "/app/spr/device_type",
            method: "GET",
        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(DeviceTypeActionCreators.setLoadDeviceType(response.data));
                }
            })
            .finally(() => {
                dispatch(DeviceTypeActionCreators.setIsLoading(false));
            });
    },
    saveDeviceType: (body) => (dispatch: AppDispatch) => {
        dispatch(DeviceTypeActionCreators.setIsSaving(true));
        return dispatch(Request({
            url: "/app/spr/device_type",
            method: "POST",
            body: JSON.stringify(body),
        }))
            .then((response) => {
                if (response.isOk) {
                    if (response.isOk) {
                        dispatch(DeviceTypeActionCreators.setSaveDeviceType(response.data));
                        return {
                            isOk: true
                        };
                    } else {
                        return {
                            isOk: false,
                            message: response.data
                        };
                    }
                } else {
                    return {
                        isOk: false,
                        message: response.data
                    };
                }
            })
            .finally(() => {
                dispatch(DeviceTypeActionCreators.setIsSaving(false));
            });
    },
    setIsLoading: (payload) => ({type: TypeDeviceType.SET_IS_LOADING, payload}),
    setIsSaving: (payload) => ({type: TypeDeviceType.SET_IS_SAVING, payload})
}