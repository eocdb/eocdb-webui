export const API_SERVER_VERSION='0.1.8';
export const API_SERVER_VERSION_TAG='latest';

let baseUrl = 'http://localhost:4000';

if (process.env.NODE_ENV === 'production') {
    baseUrl = "https://ocdb.eumetsat.int";
}

export const SERVER_CONFIG = baseUrl + "/ocdb/api/" + API_SERVER_VERSION_TAG;

export const DEBUG = true;

//"proxy": "https://localhost:4000/",