export const API_SERVER_VERSION='0.1.9';
export const API_SERVER_VERSION_TAG='latest';

let baseUrl = process.env.REACT_APP_API_SERVER_URL;


console.log(baseUrl);
console.log(process.env.REACT_APP_MODE);
console.log(process.env.REACT_APP_API_SERVER_URL);

export const SERVER_CONFIG = baseUrl + "/ocdb/api/" + API_SERVER_VERSION_TAG;

export const DEBUG = true;
