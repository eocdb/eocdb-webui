import { callJsonApi } from './callApi';
import { SubmissionFile } from "../model";


/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param submissionId: ID of the submission
 * @param submissionFileIndex: Index of the submission file
 */
export function getSubmissionFile(apiServerUrl: string,
                                  submissionId: string,
                                  submissionFileIndex: number): Promise<SubmissionFile> {

    return callJsonApi<SubmissionFile>(
        apiServerUrl + '/store/upload/submissionfile/' + submissionId + '/' + submissionFileIndex
    );
}
