import {callJsonApi} from './callApi';
import {Submission} from "../model";

/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param user: ID of the user
 */
export function getSubmissionsForUser(apiServerUrl: string, user: number): Promise<Submission[]> {

    return callJsonApi<Submission[]>(
        apiServerUrl + '/store/upload/user/' + user, undefined,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "same-origin",
        }
    );
}
