import {TypeApp} from "./types";
import type {AppDispatch} from "../rootReducer";

export const AppActionCreators = {
    setIsVisibleLeftMenu: (payload) => ({type: TypeApp.SET_IS_VISIBLE_LEFT_MENU, payload}),
}