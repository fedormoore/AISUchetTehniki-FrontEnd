import {TypeCounterparty} from "./types";

const initialState = {
    counterpartyList: [],
    isSaving: false,
    isLoading: false
}

export const counterpartyReducer = (state = initialState, action) => {
    switch (action.type) {
        case TypeCounterparty.SAVE_COUNTERPARTY:
            if (state.counterpartyList.some(el => el.id === action.payload.id)) {
                return {
                    ...state, counterpartyList:
                        state.counterpartyList.map((content) => {
                            if (content.id === action.payload.id) {
                                return action.payload
                            }
                            return content
                        })
                }
            }
            return {
                ...state, counterpartyList:
                    state.counterpartyList.concat(action.payload)
            }
        case TypeCounterparty.LOAD_COUNTERPARTY:
            return {...state, counterpartyList: action.payload}
        case TypeCounterparty.SET_IS_SAVING:
            return {...state, isSaving: action.payload}
        case TypeCounterparty.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}