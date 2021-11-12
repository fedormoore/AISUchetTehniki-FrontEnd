import {TypeIncome} from "./types";

const initialState = {
    incomeList: [],
    isSaving: false,
    isLoading: false
}

export const incomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case TypeIncome.SAVE_INCOME:
            if (state.incomeList.some(el => el.id === action.payload.id)) {
                return {
                    ...state, incomeList:
                        state.incomeList.map((content) => {
                            if (content.id === action.payload.id) {
                                return action.payload
                            }
                            return content
                        })
                }
            }
            return {
                ...state, incomeList:
                    state.incomeList.concat(action.payload)
            }
        case TypeIncome.LOAD_INCOME:
            return {...state, incomeList: action.payload}
        case TypeIncome.SET_IS_SAVING:
            return {...state, isSaving: action.payload}
        case TypeIncome.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}