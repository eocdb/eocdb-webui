import { callJsonApi } from './callApi';
import { SubmissionFile } from "./getSubmissionFilesForSubmission";


/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param submissionId: ID of the submission
 */
export function getSubmissionFile(apiServerUrl: string,
                                  submissionId: string,
                                  submissionFileIndex: number): Promise<SubmissionFile> {

    return callJsonApi<SubmissionFile>(
        apiServerUrl + '/store/upload/submissionfile?submission_id=' + submissionId + '&index=' + submissionFileIndex
    );
}
