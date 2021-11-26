import {AuthActionCreators} from "../reducers/auth/action-creators";

const SERVER = "http://localhost:8080";
const VER = "/api/v1"

export function Request(options) {

    const getToken = () => {
        const auth = localStorage.getItem("accessToken");
        if (auth !== null) {
            return {'Authorization': 'Bearer ' + auth, "Content-Type": "application/json"}
        } else {
            return {"Content-Type": "application/json"};
        }
    }

    return async dispatch => {
        return await fetch(SERVER + VER + options.url, {
            body: options.body,
            method: options.method,
            headers: getToken()
        })
            .then((response) => {
                return response.json()
                    .then((responseJson) => {
                        if (response.status !== 200) {
                            if (response.status === 401) {
                                checkAuth();
                            }
                            return {
                                isOk: false,
                                data: responseJson.message
                            };
                        }
                        return {
                            isOk: true,
                            data: responseJson
                        };
                    })
                    .catch((error) => {
                        return {
                            isOk: false,
                            data: error.message
                        };
                    })
            })
            .catch((error) => {
                return {
                    isOk: false,
                    data: error.message
                };
            })
    }
}

export async function checkAuth() {
    console.log('401')
//credentials: "same-origin"
    const auth = localStorage.getItem("refreshToken");
    await fetch(SERVER + VER + "/auth/refresh-tokens", {
        body: JSON.stringify({"refreshToken":auth}),
        method: "POST",
        headers: {"Content-Type": "application/json"}
    })
        .then((response) => {
            return response.json()
                .then((responseJson) => {
                    console.log(responseJson)
                    localStorage.setItem("accessToken", responseJson.accessToken);
                })
                .catch((error) => {
                    console.log(error)
                })
        })
        .catch((error) => {
            console.log(error)
        })
}