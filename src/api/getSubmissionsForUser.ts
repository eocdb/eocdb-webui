import { callJsonApi } from './callApi';
import { SubmissionFile } from "./getSubmissionFilesForSubmission";


export interface Submission {
    submissionId: string;
    userId: number;
    date: string;
    status: string;
    files: SubmissionFile[];
}

/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param user: ID of the user
 */
export function getSubmissionsForUser(apiServerUrl: string, user: number): Promise<Submission[]> {

    return callJsonApi<Submission[]>(apiServerUrl + '/store/upload/user/'+ user);
}
