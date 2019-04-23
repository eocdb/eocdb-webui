import { callJsonApi } from './callApi';
import { Links } from "../model/Links";


/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param submissionId: ID of the submission
 */
export function getLinks(apiServerUrl: string): Promise<Links> {

    return callJsonApi(apiServerUrl + '/links');
}
