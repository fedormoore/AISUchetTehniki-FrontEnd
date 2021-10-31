import {TypeUser} from "./types";

const initialState = {
    info: '',
    error: '',
    userList: [],
    isLoading: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case TypeUser.SET_INFO:
            return {...state, info: action.payload, isLoading: false}
        case TypeUser.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}
        case TypeUser.SAVE_USER:
            if (state.userList.some(el => el.id === action.payload.id)) {
                return {
                    ...state, userList:
                        state.userList.map((content) => {
                            if (content.id === action.payload.id) {
                                return action.payload
                            }
                            return content
                        })
                }
            }
            return {
                ...state, userList:
                    state.userList.concat(action.payload)
            }
        case TypeUser.LOAD_USER:
            return {...state, userList: action.payload}
        case TypeUser.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}