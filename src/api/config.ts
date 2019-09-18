export const API_SERVER_VERSION='v0.1.6';

let baseUrl = 'http://localhost:4000';

if (process.env.NODE_ENV === 'production') {
    baseUrl = "https://ocdb.eumetsat.int";
}

export const SERVER_CONFIG = baseUrl + "/ocdb/api/" + API_SERVER_VERSION;

export const DEBUG = true;

//"proxy": "https://localhost:4000/",