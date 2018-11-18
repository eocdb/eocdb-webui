import { SERVER_URL } from './config';

export function searchDatasets(searchParameters: any) {
    const queryComponents = [];
    for (const propertyName of Object.getOwnPropertyNames(searchParameters)) {
        queryComponents.push([propertyName, searchParameters[propertyName]]);
    }
    const queryString = queryComponents.map(kv => kv.map(encodeURIComponent).join("=")).join("&");
    return fetch(SERVER_URL + "/datasets?" + queryString).then(response => {
        return response.json();
    });
}
