import {TypeCounterparty} from "./types";
import type {AppDispatch} from "../rootReducer";
import {Request} from "../../../utils/network";

export const CounterpartyActionCreators = {
    setLoadCounterparty: (payload) => ({type: TypeCounterparty.LOAD_COUNTERPARTY, payload}),
    setSaveCounterparty: (payload) => ({type: TypeCounterparty.SAVE_COUNTERPARTY, payload}),
    loadCounterparty: () => (dispatch: AppDispatch) => {
        dispatch(CounterpartyActionCreators.setIsLoading(true));
        const auth = localStorage.getItem("token");
        Request({
            url: "/app/spr/counterparty",
            method: "GET",
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(CounterpartyActionCreators.setLoadCounterparty(response));
            })
            .catch((error) => {
                console.log("error")
            })
            .finally(() => {
                dispatch(CounterpartyActionCreators.setIsLoading(false));
            });
    },
    saveCounterparty: (body) => (dispatch: AppDispatch) => {
        dispatch(CounterpartyActionCreators.setIsSaving(true));
        const auth = localStorage.getItem("token");
        return Request({
            url: "/app/spr/counterparty",
            method: "POST",
            body: JSON.stringify(body),
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(CounterpartyActionCreators.setSaveCounterparty(response));
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
                dispatch(CounterpartyActionCreators.setIsSaving(false));
            });
    },
    setIsLoading: (payload) => ({type: TypeCounterparty.SET_IS_LOADING, payload}),
    setIsSaving: (payload) => ({type: TypeCounterparty.SET_IS_SAVING, payload})
}