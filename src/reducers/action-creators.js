import {AuthActionCreators} from "./auth/action-creators";
import {AppActionCreators} from "./app/action-creators";
import {UserActionCreators} from "./spr/user/action-creators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...AppActionCreators,
    ...UserActionCreators
}