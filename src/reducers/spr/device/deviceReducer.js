import {TypeDevice} from "./types";

const initialState = {
    firmList: [],
    isSavingFirm: false,
    isLoadingFirm: false,

    modelList: [],
    isSavingModel: false,
    isLoadingModel: false
}

export const deviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case TypeDevice.SAVE_FIRM:
            if (state.firmList.some(el => el.id === action.payload.id)) {
                return {
                    ...state, firmList:
                        state.firmList.map((content) => {
                            if (content.id === action.payload.id) {
                                return action.payload
                            }
                            return content
                        })
                }
            }
            return {
                ...state, firmList:
                    state.firmList.concat(action.payload)
            }
        case TypeDevice.LOAD_FIRM:
            return {...state, firmList: action.payload}
        case TypeDevice.SET_IS_SAVING_FIRM:
            return {...state, isSavingFirm: action.payload}
        case TypeDevice.SET_IS_LOADING_FIRM:
            return {...state, isLoadingFirm: action.payload}

        case TypeDevice.SAVE_MODEL:
            if (state.modelList.some(el => el.id === action.payload.id)) {
                return {
                    ...state, modelList:
                        state.modelList.map((content) => {
                            if (content.id === action.payload.id) {
                                return action.payload
                            }
                            return content
                        })
                }
            }
            return {
                ...state, modelList:
                    state.modelList.concat(action.payload)
            }
        case TypeDevice.LOAD_MODEL:
            return {...state, modelList: action.payload}
        case TypeDevice.SET_IS_SAVING_MODEL:
            return {...state, isSavingModel: action.payload}
        case TypeDevice.SET_IS_LOADING_MODEL:
            return {...state, isLoadingModel: action.payload}
        default:
            return state
    }
}