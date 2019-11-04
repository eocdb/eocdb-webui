export const API_SERVER_VERSION='0.1.9';
export const API_SERVER_VERSION_TAG='latest';

let baseUrl = 'http://localhost/ocdb-server';

if (process.env.NODE_ENV === 'production') {
    baseUrl = "https://ocdb.eumetsat.int";
}
else if(process.env.NODE_ENV == 'staging'){
    baseUrl = "https://ocdb.eumetsat.int/stage";
}

console.log(baseUrl);
console.log(process.env.NODE_ENV);

export const SERVER_CONFIG = baseUrl + "/ocdb/api/" + API_SERVER_VERSION_TAG;

export const DEBUG = true;
