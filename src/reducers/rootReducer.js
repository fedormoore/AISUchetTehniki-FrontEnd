import {combineReducers} from "redux";
import {authReducer} from "./auth/authReducer";
import store from "../store/store";

export const rootReducer = combineReducers({
    auth: authReducer
})

export type AppDispatch = typeof store.dispatch;