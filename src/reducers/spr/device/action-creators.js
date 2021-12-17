import {TypeDevice} from "./types";
import type {AppDispatch} from "../rootReducer";
import {Request} from "../../../http/network";

export const DeviceActionCreators = {
    setLoadFirm: (payload) => ({type: TypeDevice.LOAD_FIRM, payload}),
    setSaveFirm: (payload) => ({type: TypeDevice.SAVE_FIRM, payload}),
    loadFirm: () => (dispatch: AppDispatch) => {
        dispatch(DeviceActionCreators.setIsLoadingFirm(true));
        dispatch(Request({
            url: "/app/spr/firm",
            method: "GET",
        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(DeviceActionCreators.setLoadFirm(response.data));
                    dispatch(DeviceActionCreators.setLoadModel([]));
                }
            })
            .finally(() => {
                dispatch(DeviceActionCreators.setIsLoadingFirm(false));
            });
    },
    saveFirm: (body) => (dispatch: AppDispatch) => {
        dispatch(DeviceActionCreators.setIsSavingFirm(true));
        return dispatch(Request({
            url: "/app/spr/firm",
            method: "POST",
            body: JSON.stringify(body),
        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(DeviceActionCreators.setSaveFirm(response.data));
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
                dispatch(DeviceActionCreators.setIsSavingFirm(false));
            });
    },
    setIsLoadingFirm: (payload) => ({type: TypeDevice.SET_IS_LOADING_FIRM, payload}),
    setIsSavingFirm: (payload) => ({type: TypeDevice.SET_IS_SAVING_FIRM, payload}),

    setLoadModel: (payload) => ({type: TypeDevice.LOAD_MODEL, payload}),
    setSaveModel: (payload) => ({type: TypeDevice.SAVE_MODEL, payload}),
    loadAllModel: () => (dispatch: AppDispatch) => {
        dispatch(DeviceActionCreators.setIsLoadingModel(true));
        dispatch(Request({
            url: "/app/spr/model",
            method: "GET",
        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(DeviceActionCreators.setLoadModel(response.data));
                }
            })
            .finally(() => {
                dispatch(DeviceActionCreators.setIsLoadingModel(false));
            });
    },
    loadModel: (id) => (dispatch: AppDispatch) => {
        dispatch(DeviceActionCreators.setIsLoadingModel(true));
        dispatch(Request({
            url: "/app/spr/model/" + id,
            method: "GET",
        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(DeviceActionCreators.setLoadModel(response.data));
                }
            })
            .finally(() => {
                dispatch(DeviceActionCreators.setIsLoadingModel(false));
            });
    },
    saveModel: (body) => (dispatch: AppDispatch) => {
        dispatch(DeviceActionCreators.setIsSavingModel(true));
        return dispatch(Request({
            url: "/app/spr/model",
            method: "POST",
            body: JSON.stringify(body),
        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(DeviceActionCreators.setSaveModel(response.data));
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
                dispatch(DeviceActionCreators.setIsSavingModel(false));
            });
    },
    setIsLoadingModel: (payload) => ({type: TypeDevice.SET_IS_LOADING_MODEL, payload}),
    setIsSavingModel: (payload) => ({type: TypeDevice.SET_IS_SAVING_MODEL, payload})
}