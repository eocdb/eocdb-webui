import { callJsonApi } from './callApi';
import { SubmissionFile } from "../model";



/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param submissionId: ID of the submission
 */
export function getSubmissionFilesForSubmission(apiServerUrl: string, submissionId: string): Promise<SubmissionFile[]> {

    return callJsonApi<SubmissionFile[]>(apiServerUrl + '/store/upload/submission/'+ submissionId);
}
