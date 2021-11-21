import {AuthActionCreators} from "./auth/action-creators";
import {AppActionCreators} from "./app/action-creators";
import {UserActionCreators} from "./spr/user/action-creators";
import {DeviceTypeActionCreators} from "./spr/deviceType/action-creators";
import {LocationActionCreators} from "./spr/location/action-creators";
import {DeviceActionCreators} from "./spr/device/action-creators";
import {CounterpartyActionCreators} from "./spr/counterparty/action-creators";
import {IncomeActionCreators} from "./doc/income/action-creators";
import {RegistryActionCreators} from "./registry/action-creators";
import {BudgetAccountActionCreators} from "./spr/budgetAccount/action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...AppActionCreators,
    ...UserActionCreators,
    ...DeviceTypeActionCreators,
    ...LocationActionCreators,
    ...DeviceActionCreators,
    ...CounterpartyActionCreators,
    ...IncomeActionCreators,
    ...RegistryActionCreators,
    ...BudgetAccountActionCreators
}