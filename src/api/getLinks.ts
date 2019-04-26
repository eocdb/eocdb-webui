import { callJsonApi } from './callApi';
import { Links } from "../model/Links";


/**
 *
 * @param apiServerUrl: URL of the OCDB API
 */
export function getLinks(apiServerUrl: string): Promise<Links> {

    return callJsonApi(apiServerUrl + '/links');
}
