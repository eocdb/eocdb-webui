import { callApi } from './callApi';


/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param submissionId: ID of the submission
 */
export function deleteSubmission(apiServerUrl: string, submissionId: string): Promise<Response> {

    return callApi(
        apiServerUrl + '/store/upload/submission/' + submissionId,
        undefined,
        {
            method: 'DELETE',
        }
    );
}
