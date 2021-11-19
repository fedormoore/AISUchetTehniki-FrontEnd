import {TypeRegistry} from "./types";

const initialState = {
    registryList: [],
    isSaving: false,
    isLoading: false
}

export const registryReducer = (state = initialState, action) => {
    switch (action.type) {
        case TypeRegistry.SAVE_REGISTRY:
            if (state.registryList.some(el => el.id === action.payload.id)) {
                return {
                    ...state, registryList:
                        state.registryList.map((content) => {
                            if (content.id === action.payload.id) {
                                return action.payload
                            }
                            return content
                        })
                }
            }
            return {
                ...state, registryList:
                    state.registryList.concat(action.payload)
            }
        case TypeRegistry.LOAD_REGISTRY:
            return {...state, registryList: action.payload}
        case TypeRegistry.SET_IS_SAVING:
            return {...state, isSaving: action.payload}
        case TypeRegistry.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}