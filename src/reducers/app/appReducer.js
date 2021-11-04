import {TypeApp} from "./types";

const initialState = {
    isVisibleLeftMenu: true
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case TypeApp.SET_IS_VISIBLE_LEFT_MENU:
            // console.log()
            return {...state, isVisibleLeftMenu: action.payload}
        default:
            return state
    }
}