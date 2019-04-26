import { Dataset } from "../model";
import { callJsonApi } from "./callApi";

/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param datasetId: ID of a sing OCDB dataset
 */
export function getDatasetById(apiServerUrl: string, datasetId: string): Promise<Dataset> {

    return callJsonApi<Dataset>(apiServerUrl + '/datasets/' + datasetId);
}