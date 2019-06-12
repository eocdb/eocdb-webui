export const API_SERVER_VERSION='v0.1.5';

const baseUrl = process.env.NODE_ENV === 'development' || process.env.REACT_APP_APPENV == 'local'
    ? "https://localhost" : "https://ocdb.eumetsat.int";

export const SERVER_CONFIG = baseUrl + "/ocdb/api/" + API_SERVER_VERSION;

export const DEBUG = true;
