import {TypeApp} from "./types";

const initialState = {
    isVisibleLeftMenu: true,
    isDark:true
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case TypeApp.SET_IS_VISIBLE_LEFT_MENU:
            return {...state, isVisibleLeftMenu: action.payload}
        case TypeApp.SET_IS_DARK:
            return {...state, isDark: action.payload}
        default:
            return state
    }
}