import { callJsonApi } from './callApi';
import { DatasetValidationResult } from "./uploadStoreFiles";


export interface SubmissionFile {
    index: number;
    submissionId: string;
    fileName: string;
    status: string;
    result: DatasetValidationResult;
}

/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param submissionId: ID of the submission
 */
export function getSubmissionFilesForSubmission(apiServerUrl: string, submissionId: string): Promise<SubmissionFile[]> {

    return callJsonApi<SubmissionFile[]>(apiServerUrl + '/store/upload/submission/'+ submissionId);
}
