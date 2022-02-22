import { callBlobApi } from "./callApi";
import { collectComponents } from "./findDatasets";
import { DatasetQuery } from "../model";


export function downloadStoreFiles(apiServerUrl: string, datasetQuery: DatasetQuery): Promise<Blob> {

    const queryComponents = collectComponents(datasetQuery);

    return callBlobApi(apiServerUrl + '/store/download', queryComponents);
}


export function downloadStoreFilesByIds(apiServerUrl: string, selectedDatasets: string[], downloadDocs: boolean,
                                        fileName?: string)
    : Promise<Blob> {
    const queryComponents = {id_list: selectedDatasets, docs: downloadDocs};

    return callBlobApi(apiServerUrl + '/store/download',
        undefined,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(queryComponents),
        },
        fileName);
}
