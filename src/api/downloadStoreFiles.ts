import { callBlobApi } from "./callApi";
import { collectComponents, DatasetQuery } from "./findDatasets";


export function downloadStoreFiles(apiServerUrl: string, datasetQuery: DatasetQuery): Promise<Blob> {

    const queryComponents = collectComponents(datasetQuery);

    return callBlobApi(apiServerUrl + '/store/download', queryComponents);
}


export function collectIdComponents(datasetQuery: DatasetQuery) {
    let queryComponents = undefined;

    if (datasetQuery.datasetIds) {
        queryComponents = { id_list: datasetQuery.datasetIds };
    }

    return queryComponents;
}

export function downloadStoreFilesByIds(apiServerUrl: string, datasetQuery: DatasetQuery): Promise<Blob> {

    const queryComponents = collectIdComponents(datasetQuery);
    //const queryComponents = {id_list: ["5bf5451761d82d05dcd6cfb5", "5bf5451761d82d05dcd6cfb6"], docs: false};

    return callBlobApi(apiServerUrl + '/store/download',
        undefined,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(queryComponents),
        });
}