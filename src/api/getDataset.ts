import { Dataset } from '../types/dataset';
import { callJsonApi, getRequestInit } from './callApi';


export function getDataset(apiServerUrl: string, apiServerAuth: string, datasetId: string): Promise<Dataset> {
    return callJsonApi<Dataset>(
        apiServerUrl + '/datasets/' + datasetId,
        undefined,
        getRequestInit(apiServerAuth)
    );
}
