import {AuthActionCreators} from "../reducers/auth/action-creators";

const SERVER = "http://localhost:8080";
const VER = "/api/v1"

const getToken = () => {
    const auth = localStorage.getItem("accessToken");
    if (auth !== null) {
        return {'Authorization': 'Bearer ' + auth, "Content-Type": "application/json"}
    } else {
        return {"Content-Type": "application/json"};
    }
}

export async function Request(options) {

    // return async (dispatch) => {
        try {
            const response = await fetch(SERVER + VER + options.url, {
                body: options.body,
                method: options.method,
                headers: getToken()
            });

            const json = await response.json();

            if (!response.ok) {
                throw (json);
            }

            return {
                isOk: true,
                data: json
            };
        } catch (e) {
            // if (e.status === 401 || e.status === 403) {
            //     return dispatch(checkAuth(options))
            //         .then(response => {
            //             return {
            //                 isOk: true,
            //                 data: response
            //             };
            //         })
            // }
            return {
                isOk: false,
                data: e.message
            };
        }
    // }
}

export function checkAuth (options) {
    return async dispatch => {
        const auth = localStorage.getItem("refreshToken");
        try {
            let response = await fetch(SERVER + VER + "/auth/refresh-tokens", {
                body: JSON.stringify({"refreshToken": auth}),
                method: "POST",
                headers: {"Content-Type": "application/json"}
            });
            let json = await response.json();

            if (!response.ok) {
                throw (json);
            }

            localStorage.setItem("accessToken", json.accessToken);

            dispatch(AuthActionCreators.setIsAuth(true))

            if (options !== undefined) {
                response = await fetch(SERVER + VER + options.url, {
                    body: options.body,
                    method: options.method,
                    headers: getToken()
                })
                return await response.json();
            }
        } catch (e) {
            if (e.status === 401 || e.status === 403 || e.status === 'UNAUTHORIZED') {
                localStorage.removeItem('isAuth')
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                dispatch(AuthActionCreators.setUser({}));
                dispatch(AuthActionCreators.setIsAuth(false))
                return {
                    isOk: false,
                    data: {}
                };
            }
        }
    }
}