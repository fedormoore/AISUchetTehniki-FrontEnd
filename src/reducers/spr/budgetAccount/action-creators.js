import {TypeBudgetAccount} from "./types";
import type {AppDispatch} from "../rootReducer";
import Request from "../../../utils/network";

export const BudgetAccountActionCreators = {
    setLoadBudgetAccount: (payload) => ({type: TypeBudgetAccount.LOAD_BUDGET_ACCOUNT, payload}),
    setSaveBudgetAccount: (payload) => ({type: TypeBudgetAccount.SAVE_BUDGET_ACCOUNT, payload}),
    loadBudgetAccount: () => (dispatch: AppDispatch) => {
        dispatch(BudgetAccountActionCreators.setIsLoading(true));
        const auth = localStorage.getItem("token");
        Request({
            url: "/app/spr/budget_account",
            method: "GET",
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(BudgetAccountActionCreators.setLoadBudgetAccount(response));
            })
            .catch((error) => {
                console.log("error")
            })
            .finally(() => {
                dispatch(BudgetAccountActionCreators.setIsLoading(false));
            });
    },
    saveBudgetAccount: (body) => (dispatch: AppDispatch) => {
        dispatch(BudgetAccountActionCreators.setIsSaving(true));
        const auth = localStorage.getItem("token");
        return Request({
            url: "/app/spr/budget_account",
            method: "POST",
            body: JSON.stringify(body),
            headers:{
                'Authorization': 'Bearer ' + auth,
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                dispatch(BudgetAccountActionCreators.setSaveBudgetAccount(response));
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
                dispatch(BudgetAccountActionCreators.setIsSaving(false));
            });
    },
    setIsLoading: (payload) => ({type: TypeBudgetAccount.SET_IS_LOADING, payload}),
    setIsSaving: (payload) => ({type: TypeBudgetAccount.SET_IS_SAVING, payload})
}