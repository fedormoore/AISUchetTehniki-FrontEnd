import {TypeIncome} from "./types";
import type {AppDispatch} from "../rootReducer";
import Request from "../../../utils/network";

export const IncomeActionCreators = {
    setLoadIncome: (payload) => ({type: TypeIncome.LOAD_INCOME, payload}),
    setSaveIncome: (payload) => ({type: TypeIncome.SAVE_INCOME, payload}),
    loadIncome: () => (dispatch: AppDispatch) => {
        dispatch(IncomeActionCreators.setIsLoading(true));
        const auth = localStorage.getItem("token");
        Request({
            url: "/app/doc/income_main",
            method: "GET",
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(IncomeActionCreators.setLoadIncome(response));
            })
            .catch((error) => {
                console.log("error")
            })
            .finally(() => {
                dispatch(IncomeActionCreators.setIsLoading(false));
            });
    },
    saveIncome: (body) => (dispatch: AppDispatch) => {
        dispatch(IncomeActionCreators.setIsSaving(true));
        const auth = localStorage.getItem("token");
        return Request({
            url: "/app/doc/income_main",
            method: "POST",
            body: JSON.stringify(body),
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(IncomeActionCreators.setSaveIncome(response));
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
                dispatch(IncomeActionCreators.setIsSaving(false));
            });
    },
    setIsLoading: (payload) => ({type: TypeIncome.SET_IS_LOADING, payload}),
    setIsSaving: (payload) => ({type: TypeIncome.SET_IS_SAVING, payload})
}