import {Request} from "../http/network";

export const methodDelete = (url, body) => {
    return Request({
        url: url,
        method: "DELETE",
        body: JSON.stringify(body),
    })
        .then((response) => {
            if (response.isOk) {
                return {
                    isOk: true
                };
            } else {
                return {
                    isOk: false,
                    message: response.data
                };
            }
        });
}