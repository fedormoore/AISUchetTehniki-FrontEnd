import {combineReducers} from "redux";
import {authReducer} from "./auth/authReducer";
import store from "../store/store";
import {appReducer} from "./app/appReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer
})

export type AppDispatch = typeof store.dispatch;