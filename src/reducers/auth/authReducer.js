import {TypeAuth} from "./types";

const initialState = {
    isAuth: false,
    error: '',
    info: '',
    user: {userName: ''},
    isLoading: false,
    isRegistrationOk: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TypeAuth.SET_AUTH:
            return {...state, isAuth: action.payload, isLoading: false}
        case TypeAuth.SET_USER:
            return {...state, user: action.payload}
        case TypeAuth.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}
        case TypeAuth.SET_INFO:
            return {...state, info: action.payload, isLoading: false}
        case TypeAuth.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}