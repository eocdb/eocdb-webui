import { callJsonApi } from "./callApi";


export type SubmissionFileStatus = 'SUBMITTED' | 'VALIDATED' | 'APPROVED' | 'PUBLISHED';


export function setSubmissionFileStatus(apiServerUrl: string, submissionFileId: string, status: SubmissionFileStatus):
    Promise<undefined>{

    return callJsonApi<undefined>(apiServerUrl + '/store/upload/status/' + submissionFileId + '/' + status);
}