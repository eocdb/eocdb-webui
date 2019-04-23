import { callJsonApi } from './callApi';
import { Links } from "../model/Links";


/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param submissionId: ID of the submission
 */
export function saveLinks(apiServerUrl: string, content: string): Promise<Links> {
    const result = {content: content};

    return callJsonApi(apiServerUrl + '/links',
        undefined,
        {
            method: 'POST',
            body: JSON.stringify(result),
        }
    );
}
