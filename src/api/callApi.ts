import { HTTPError } from './errors';
import { DEBUG } from "./config";


export type QueryComponent = [string, string];

export function makeUrl(url: string, queryComponents?: QueryComponent[]) {
    if (queryComponents && queryComponents.length > 0) {
        const queryString = queryComponents.map(kv => kv.map(encodeURIComponent).join('=')).join('&');
        url += '?' + queryString;
    }
    return url;
}

export function callApi(endpointUrl: string, queryComponents?: QueryComponent[], init?: RequestInit): Promise<Response> {
    const url = makeUrl(endpointUrl, queryComponents);

    if (DEBUG) {
        console.debug('Calling API: ', url);
    }

    return fetch(url, init)
        .then(response => {
            if (!response.ok) {
                throw new HTTPError(response.status, response.statusText);
            }
            return response;
        })
        .catch(error => {
            if (error instanceof TypeError) {
                throw new Error(`Cannot reach ${endpointUrl}`);
            }
            throw error;
        });
}

function download(blob: Blob, fileName?: string){
    if (!fileName) {
        const dtt = new Date(Date.now());
        fileName = 'insitu_' + dtt.toDateString() + '.zip';
    }
    const objectUrl: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
}


export function callBlobApi(endpointUrl: string, queryComponents?: QueryComponent[], init?: RequestInit, fileName?: string)
    : Promise<Blob> {
    return callApi(endpointUrl, queryComponents, init).then(response => response.blob())
        .then((blob: Blob) => {
            download(blob, fileName);

            return blob;
        });
}


export function callJsonApi<T>(endpointUrl: string, queryComponents?: QueryComponent[], init?: RequestInit): Promise<T> {
    return callApi(endpointUrl, queryComponents, init).then(response => response.json());
}
