import { callJsonApi } from './callApi';
import { Submission } from "../model";


/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param submissionId: ID of the submission
 */
export function getSubmission(apiServerUrl: string, submissionId: string): Promise<Submission> {

    return callJsonApi<Submission>(apiServerUrl + '/store/upload/submission/' + submissionId);
}
