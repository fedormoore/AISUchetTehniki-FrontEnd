import {TypeIncome} from "./types";
import type {AppDispatch} from "../rootReducer";
import {Request} from "../../../http/network";

export const IncomeActionCreators = {
    setLoadIncome: (payload) => ({type: TypeIncome.LOAD_INCOME, payload}),
    setSaveIncome: (payload) => ({type: TypeIncome.SAVE_INCOME, payload}),
    loadIncome: () => (dispatch: AppDispatch) => {
        dispatch(IncomeActionCreators.setIsLoading(true));
        dispatch(Request({
            url: "/app/doc/income_main",
            method: "GET",
        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(IncomeActionCreators.setLoadIncome(response.data));
                }
            })
            .finally(() => {
                dispatch(IncomeActionCreators.setIsLoading(false));
            });
    },
    saveIncome: (body) => (dispatch: AppDispatch) => {
        dispatch(IncomeActionCreators.setIsSaving(true));

        return dispatch(Request({
            url: "/app/doc/income_main",
            method: "POST",
            body: JSON.stringify(body),
        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(IncomeActionCreators.setSaveIncome(response.data));
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
                dispatch(IncomeActionCreators.setIsSaving(false));
            });
    },
    setIsLoading: (payload) => ({type: TypeIncome.SET_IS_LOADING, payload}),
    setIsSaving: (payload) => ({type: TypeIncome.SET_IS_SAVING, payload})
}