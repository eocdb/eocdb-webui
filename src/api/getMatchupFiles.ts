import { callJsonApi } from './callApi';
import { MatchupFiles } from "../model/MatchupFiles";



/**
 *
 * @param apiServerUrl: URL of the OCDB API
 */
export function getMatchupFiles(apiServerUrl: string): Promise<MatchupFiles[]> {

    return callJsonApi(apiServerUrl + '/matchupfiles');
}
