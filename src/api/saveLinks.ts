import { callJsonApi } from './callApi';
import { Links } from "../model/Links";


/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param content: Markdown Content of Links Page
 */
export function saveLinks(apiServerUrl: string, content: string): Promise<Links> {
    const result = {content: content};

    return callJsonApi(apiServerUrl + '/links',
        undefined,
        {
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify(result),
        }
    );
}
