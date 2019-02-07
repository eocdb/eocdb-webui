import { callJsonApi } from './callApi';
import { DatasetValidationResult } from "./uploadStoreFiles";


export interface SubmissionForUserResult {
    index: number;
    submissionId: string;
    fileName: string;
    status: string;
    result: DatasetValidationResult;
}

/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param user: ID of the user
 */
export function getSubmissionFilesForUser(apiServerUrl: string, user: number): Promise<SubmissionForUserResult[]> {

    return callJsonApi<SubmissionForUserResult[]>(apiServerUrl + '/store/upload/user/'+ user);
}
