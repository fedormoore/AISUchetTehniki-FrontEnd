import {AuthActionCreators} from "./auth/action-creators";
import {AppActionCreators} from "./app/action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...AppActionCreators
}