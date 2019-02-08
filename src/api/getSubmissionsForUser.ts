import { callJsonApi } from './callApi';
import { SubmissionFile } from "./getSubmissionFilesForSubmission";


export interface Submission {
    submission_id: string;
    user_id: number;
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
