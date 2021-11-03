import {TypeLocation} from "./types";

const initialState = {
    locationList: [],
    isSaving: false,
    isLoading: false
}

export const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case TypeLocation.SAVE_LOCATION:
            return {...state, locationList: action.payload}
        case TypeLocation.LOAD_LOCATION:
            return {...state, locationList: action.payload}
        case TypeLocation.SET_IS_SAVING:
            return {...state, isSaving: action.payload}
        case TypeLocation.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}