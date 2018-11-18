export function searchDatasets(apiServerUrl: string, searchParameters: any) {
    const queryComponents = [];
    for (const propertyName of Object.getOwnPropertyNames(searchParameters)) {
        const propertyValue = searchParameters[propertyName];
        if (propertyValue) {
            queryComponents.push([propertyName, propertyValue]);
        }
    }
    let searchDatasetUrl = apiServerUrl + "/datasets";
    if (queryComponents.length > 0) {
        const queryString = queryComponents.map(kv => kv.map(encodeURIComponent).join("=")).join("&");
        searchDatasetUrl += "?" + queryString;
    }
    return fetch(searchDatasetUrl).then(response => {
        return response.json();
    });
}
