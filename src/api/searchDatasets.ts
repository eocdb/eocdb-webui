import { HTTPError } from './errors';


export function searchDatasets(apiServerUrl: string, searchParameters: any) {
    const queryComponents = [];
    for (const propertyName of Object.getOwnPropertyNames(searchParameters)) {
        const propertyValue = searchParameters[propertyName];
        if (propertyValue) {
            queryComponents.push([propertyName, propertyValue]);
        }
    }
    const searchDatasetEndpointUrl = apiServerUrl + '/datasets';
    let searchDatasetUrl = searchDatasetEndpointUrl;
    if (queryComponents.length > 0) {
        const queryString = queryComponents.map(kv => kv.map(encodeURIComponent).join('=')).join('&');
        searchDatasetUrl += '?' + queryString;
    }
    return fetch(searchDatasetUrl).then(response => {
        if (!response.ok) {
            throw new HTTPError(response.status, response.statusText);
        }
        return response.json();
    }).catch(e => {
        if (e instanceof TypeError) {
            throw new Error(`Cannot reach ${searchDatasetEndpointUrl}`);
        }
    });
}
