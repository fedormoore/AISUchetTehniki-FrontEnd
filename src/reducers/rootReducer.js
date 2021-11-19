import {combineReducers} from "redux";
import store from "../store/store";

import {authReducer} from "./auth/authReducer";
import {appReducer} from "./app/appReducer";
import {userReducer} from "./spr/user/userReducer";
import {deviceTypeReducer} from "./spr/deviceType/deviceTypeReducer";
import {locationReducer} from "./spr/location/locationReducer";
import {deviceReducer} from "./spr/device/deviceReducer";
import {counterpartyReducer} from "./spr/counterparty/counterpartyReducer";
import {incomeReducer} from "./doc/income/incomeReducer";
import {registryReducer} from "./registry/registryReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    user: userReducer,
    deviceType: deviceTypeReducer,
    location: locationReducer,
    device: deviceReducer,
    counterparty: counterpartyReducer,
    income: incomeReducer,
    registry: registryReducer
})

export type AppDispatch = typeof store.dispatch;