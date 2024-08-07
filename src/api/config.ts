export const API_SERVER_VERSION='0.1.9';
export const API_SERVER_VERSION_TAG='latest';

const DEFAULT_API_ENDPOINT_PRODUCTION = 'https://ocdb.eumetsat.int';
const DEFAULT_API_ENDPOINT_STAGE = 'https://ocdb-stage.eumetsat.int';
const DEFAULT_API_ENDPOINT_DEV = 'https://frm4soc-dev.brockmann-consult.de';

function getEndpointUrl(): string {
    // let url = process.env.REACT_APP_CATEHUB_ENDPOINT;
    let url = process.env.REACT_APP_API_SERVER_URL;
    if (!url) {
        if (window.location.host.indexOf('frm4soc-dev') >= 0) {
            url = DEFAULT_API_ENDPOINT_DEV;
        } else if (window.location.host.indexOf('ocdb-stage') >= 0) {
            url = DEFAULT_API_ENDPOINT_STAGE;
        } else if (window.location.host.indexOf('ocdb') >= 0) {
            url = DEFAULT_API_ENDPOINT_PRODUCTION;
        } else {
            url = window.location.origin;
        }
    }
    return url.endsWith('/') ? url.substr(0, url.length - 1) : url;
}

const baseUrl = getEndpointUrl();


console.log(baseUrl);
console.log(process.env.REACT_APP_MODE);
console.log(process.env.REACT_APP_API_SERVER_URL);

export const SERVER_CONFIG = baseUrl + "/ocdb/api/" + API_SERVER_VERSION_TAG;

export const DEBUG = true;
