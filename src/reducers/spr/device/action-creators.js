import {TypeDevice} from "./types";
import type {AppDispatch} from "../rootReducer";
import Request from "../../../utils/network";

export const DeviceActionCreators = {
    setLoadFirm: (payload) => ({type: TypeDevice.LOAD_FIRM, payload}),
    setSaveFirm: (payload) => ({type: TypeDevice.SAVE_FIRM, payload}),
    loadFirm: () => (dispatch: AppDispatch) => {
        dispatch(DeviceActionCreators.setIsLoadingFirm(true));
        const auth = localStorage.getItem("token");
        Request({
            url: "/app/spr/firm",
            method: "GET",
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(DeviceActionCreators.setLoadFirm(response));
                dispatch(DeviceActionCreators.setLoadModel([]));
            })
            .catch((error) => {
                console.log("error")
            })
            .finally(() => {
                dispatch(DeviceActionCreators.setIsLoadingFirm(false));
            });
    },
    saveFirm: (body) => (dispatch: AppDispatch) => {
        dispatch(DeviceActionCreators.setIsSavingFirm(true));
        const auth = localStorage.getItem("token");
        return Request({
            url: "/app/spr/firm",
            method: "POST",
            body: JSON.stringify(body),
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(DeviceActionCreators.setSaveFirm(response));
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
                dispatch(DeviceActionCreators.setIsSavingFirm(false));
            });
    },
    setIsLoadingFirm: (payload) => ({type: TypeDevice.SET_IS_LOADING_FIRM, payload}),
    setIsSavingFirm: (payload) => ({type: TypeDevice.SET_IS_SAVING_FIRM, payload}),

    setLoadModel: (payload) => ({type: TypeDevice.LOAD_MODEL, payload}),
    setSaveModel: (payload) => ({type: TypeDevice.SAVE_MODEL, payload}),
    loadAllModel: (id) => (dispatch: AppDispatch) => {
        dispatch(DeviceActionCreators.setIsLoadingModel(true));
        const auth = localStorage.getItem("token");
        Request({
            url: "/app/spr/model",
            method: "GET",
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(DeviceActionCreators.setLoadModel(response));
            })
            .catch((error) => {
                console.log("error")
            })
            .finally(() => {
                dispatch(DeviceActionCreators.setIsLoadingModel(false));
            });
    },
    loadModel: (id) => (dispatch: AppDispatch) => {
        dispatch(DeviceActionCreators.setIsLoadingModel(true));
        const auth = localStorage.getItem("token");
        Request({
            url: "/app/spr/model/"+id,
            method: "GET",
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(DeviceActionCreators.setLoadModel(response));
            })
            .catch((error) => {
                console.log("error")
            })
            .finally(() => {
                dispatch(DeviceActionCreators.setIsLoadingModel(false));
            });
    },
    saveModel: (body) => (dispatch: AppDispatch) => {
        dispatch(DeviceActionCreators.setIsSavingModel(true));
        const auth = localStorage.getItem("token");
        return Request({
            url: "/app/spr/model",
            method: "POST",
            body: JSON.stringify(body),
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(DeviceActionCreators.setSaveModel(response));
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
                dispatch(DeviceActionCreators.setIsSavingModel(false));
            });
    },
    setIsLoadingModel: (payload) => ({type: TypeDevice.SET_IS_LOADING_MODEL, payload}),
    setIsSavingModel: (payload) => ({type: TypeDevice.SET_IS_SAVING_MODEL, payload})
}