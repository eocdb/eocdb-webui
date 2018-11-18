export function searchDatasets(apiServerUrl: string, searchParameters: any) {
    const queryComponents = [];
    for (const propertyName of Object.getOwnPropertyNames(searchParameters)) {
        queryComponents.push([propertyName, searchParameters[propertyName]]);
    }
    const queryString = queryComponents.map(kv => kv.map(encodeURIComponent).join("=")).join("&");
    return fetch(apiServerUrl + "/datasets?" + queryString).then(response => {
        return response.json();
    });
}
