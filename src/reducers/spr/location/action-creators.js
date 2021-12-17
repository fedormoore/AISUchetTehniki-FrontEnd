import {TypeLocation} from "./types";
import type {AppDispatch} from "../rootReducer";
import {Request} from "../../../http/network";
import {methodDelete} from "../../method";

export const LocationActionCreators = {
    setLoadLocation: (payload) => ({type: TypeLocation.LOAD_LOCATION, payload}),
    setSaveLocation: (payload) => ({type: TypeLocation.SAVE_LOCATION, payload}),
    loadLocation: () => (dispatch: AppDispatch) => {
        dispatch(LocationActionCreators.setIsLoading(true));
        Request({
            url: "/app/spr/location",
            method: "GET",
        })
            .then((response) => {
                if (response.isOk) {
                    dispatch(LocationActionCreators.setLoadLocation(response.data));
                }
            })
            .finally(() => {
                dispatch(LocationActionCreators.setIsLoading(false));
            });
    },
    loadLocationTree: () => (dispatch: AppDispatch) => {
        dispatch(LocationActionCreators.setIsLoading(true));
        dispatch(Request({
            url: "/app/spr/location",
            method: "GET",
        }))
            .then((response) => {
                if (response.isOk) {
                    const newData = response.data;
                    const listTree = function (data) {
                        for (let i = 0; i < data.length; i++) {
                            data[i] = {...data[i], ...{title: data[i].name, value: data[i].name, obj: data[i]}};
                            if (data[i].hasOwnProperty('children')) {
                                listTree(data[i].children);
                            }
                        }
                    };
                    listTree(newData);
                    dispatch(LocationActionCreators.setLoadLocation(newData));
                }
            })
            .finally(() => {
                dispatch(LocationActionCreators.setIsLoading(false));
            });
    },
    saveLocation: (body) => (dispatch: AppDispatch) => {
        dispatch(LocationActionCreators.setIsSaving(true));
        return dispatch(Request({
            url: "/app/spr/location",
            method: "POST",
            body: JSON.stringify(body),
        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(LocationActionCreators.setSaveLocation(response.data));
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
                dispatch(LocationActionCreators.setIsSaving(false));
            });
    },
    deleteLocation: (body) => (dispatch: AppDispatch) => {
        return methodDelete("/app/spr/location", body);
        // dispatch(LocationActionCreators.setIsSaving(true));
        // return dispatch(Request({
        //     url: "/app/spr/location",
        //     method: "POST",
        //     body: JSON.stringify(body),
        // }))
        //     .then((response) => {
        //         if (response.isOk) {
        //             dispatch(LocationActionCreators.setSaveLocation(response.data));
        //             return {
        //                 isOk: true
        //             };
        //         } else {
        //             return {
        //                 isOk: false,
        //                 message: response.data
        //             };
        //         }
        //     })
        //     .finally(() => {
        //         dispatch(LocationActionCreators.setIsSaving(false));
        //     });
    },
    setIsLoading: (payload) => ({type: TypeLocation.SET_IS_LOADING, payload}),
    setIsSaving: (payload) => ({type: TypeLocation.SET_IS_SAVING, payload})
}