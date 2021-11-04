import {TypeDeviceType} from "./types";

const initialState = {
    deviceTypeList: [],
    isSaving: false,
    isLoading: false
}

export const deviceTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case TypeDeviceType.SAVE_DEVICE_TYPE:
            if (state.deviceTypeList.some(el => el.id === action.payload.id)) {
                return {
                    ...state, deviceTypeList:
                        state.deviceTypeList.map((content) => {
                            if (content.id === action.payload.id) {
                                return action.payload
                            }
                            return content
                        })
                }
            }
            return {
                ...state, deviceTypeList:
                    state.deviceTypeList.concat(action.payload)
            }
        case TypeDeviceType.LOAD_DEVICE_TYPE:
            return {...state, deviceTypeList: action.payload}
        case TypeDeviceType.SET_IS_SAVING:
            return {...state, isSaving: action.payload}
        case TypeDeviceType.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}