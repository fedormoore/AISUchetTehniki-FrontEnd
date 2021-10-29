const SERVER = "http://localhost:8080";
const VER = "/api/v1"

export default async function Request(options) {

    const response = await fetch(SERVER + VER + options.url, {
        body: options.body,
        method: options.method,
        headers: {
            "Content-Type": "application/json",
        }
    });

    return await response.json();
        // .then((response) => {
        //     console.log(response)
        //     return response;
        // })
        // .catch((error) => {
        //     return error;
        // })
}