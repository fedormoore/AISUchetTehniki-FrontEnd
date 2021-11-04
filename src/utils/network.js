const SERVER = "http://192.168.5.227:8080";
const VER = "/api/v1"

export default async function Request(options) {

    const response = await fetch(SERVER + VER + options.url, {
        body: options.body,
        method: options.method,
        headers: options.headers
    });

    const json = await response.json()

    if (!response.ok) {
        return Promise.reject(json);
    }

    return json;

}