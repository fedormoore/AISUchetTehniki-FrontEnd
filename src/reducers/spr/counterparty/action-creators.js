import {TypeCounterparty} from "./types";
import type {AppDispatch} from "../rootReducer";
import {Request} from "../../../http/network";

export const CounterpartyActionCreators = {
    setLoadCounterparty: (payload) => ({type: TypeCounterparty.LOAD_COUNTERPARTY, payload}),
    setSaveCounterparty: (payload) => ({type: TypeCounterparty.SAVE_COUNTERPARTY, payload}),
    loadCounterparty: () => (dispatch: AppDispatch) => {
        dispatch(CounterpartyActionCreators.setIsLoading(true));
        dispatch(Request({
            url: "/app/spr/counterparty",
            method: "GET",
        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(CounterpartyActionCreators.setLoadCounterparty(response.data));
                }
            })
            .finally(() => {
                dispatch(CounterpartyActionCreators.setIsLoading(false));
            });
    },
    saveCounterparty: (body) => (dispatch: AppDispatch) => {
        dispatch(CounterpartyActionCreators.setIsSaving(true));
        return dispatch(Request({
            url: "/app/spr/counterparty",
            method: "POST",
            body: JSON.stringify(body),
        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(CounterpartyActionCreators.setSaveRegistry(response.data));
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
                dispatch(CounterpartyActionCreators.setIsSaving(false));
            });
    },
    setIsLoading: (payload) => ({type: TypeCounterparty.SET_IS_LOADING, payload}),
    setIsSaving: (payload) => ({type: TypeCounterparty.SET_IS_SAVING, payload})
}