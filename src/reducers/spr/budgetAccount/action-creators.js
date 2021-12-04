import {TypeBudgetAccount} from "./types";
import type {AppDispatch} from "../rootReducer";
import {Request} from "../../../http/network";

export const BudgetAccountActionCreators = {
    setLoadBudgetAccount: (payload) => ({type: TypeBudgetAccount.LOAD_BUDGET_ACCOUNT, payload}),
    setSaveBudgetAccount: (payload) => ({type: TypeBudgetAccount.SAVE_BUDGET_ACCOUNT, payload}),
    loadBudgetAccount: () => (dispatch: AppDispatch) => {
        dispatch(BudgetAccountActionCreators.setIsLoading(true));
        dispatch(Request({
            url: "/app/spr/budget_account",
            method: "GET",
        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(BudgetAccountActionCreators.setLoadBudgetAccount(response.data));
                }
            })
            .finally(() => {
                dispatch(BudgetAccountActionCreators.setIsLoading(false));
            });
    },
    saveBudgetAccount: (body) => (dispatch: AppDispatch) => {
        dispatch(BudgetAccountActionCreators.setIsSaving(true));
        return dispatch( Request({
            url: "/app/spr/budget_account",
            method: "POST",
            body: JSON.stringify(body),
        }))
            .then((response) => {
                if (response.isOk) {
                    dispatch(BudgetAccountActionCreators.setSaveBudgetAccount(response));
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
                dispatch(BudgetAccountActionCreators.setIsSaving(false));
            });
    },
    setIsLoading: (payload) => ({type: TypeBudgetAccount.SET_IS_LOADING, payload}),
    setIsSaving: (payload) => ({type: TypeBudgetAccount.SET_IS_SAVING, payload})
}