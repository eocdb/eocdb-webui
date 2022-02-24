import { callJsonApi, QueryComponent } from './callApi';
import { SubmissionResult } from "../model/Submission";

export function collectComponents(offset: number, count: number) {
    const queryComponents: QueryComponent[] = [];
    if (offset) {
        queryComponents.push(['offset', JSON.stringify(offset)]);
    }
    if (count) {
        queryComponents.push(['count', JSON.stringify(count)]);
    }
    return queryComponents;
}


/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param user: ID of the user
 * @param offset: offset for pagination
 * @param count: count for pagination
 */
export function getSubmissionsForUser(apiServerUrl: string, user?: string, offset?: number, count?: number): Promise<SubmissionResult> {
    const queryComponents = collectComponents(offset, count)
    return callJsonApi<SubmissionResult>(
        apiServerUrl + '/store/upload/user', queryComponents,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "same-origin",
        }
    );
}
