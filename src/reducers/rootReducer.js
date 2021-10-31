import {combineReducers} from "redux";
import {authReducer} from "./auth/authReducer";
import store from "../store/store";
import {appReducer} from "./app/appReducer";
import {userReducer} from "./spr/user/userReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    user: userReducer
})

export type AppDispatch = typeof store.dispatch;