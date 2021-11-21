import {TypeBudgetAccount} from "./types";

const initialState = {
    budgetAccountList: [],
    isSaving: false,
    isLoading: false
}

export const budgetAccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case TypeBudgetAccount.SAVE_BUDGET_ACCOUNT:
            if (state.budgetAccountList.some(el => el.id === action.payload.id)) {
                return {
                    ...state, budgetAccountList:
                        state.budgetAccountList.map((content) => {
                            if (content.id === action.payload.id) {
                                return action.payload
                            }
                            return content
                        })
                }
            }
            return {
                ...state, budgetAccountList:
                    state.budgetAccountList.concat(action.payload)
            }
        case TypeBudgetAccount.LOAD_BUDGET_ACCOUNT:
            return {...state, budgetAccountList: action.payload}
        case TypeBudgetAccount.SET_IS_SAVING:
            return {...state, isSaving: action.payload}
        case TypeBudgetAccount.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}