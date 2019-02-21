import { callJsonApi } from "./callApi";


export type SubmissionFileStatus = 'SUBMITTED' | 'VALIDATED' | 'APPROVED' | 'PUBLISHED';


export function setSubmissionStatus(apiServerUrl: string, submissionId: string, status: SubmissionFileStatus):
    Promise<undefined>{

    return callJsonApi<undefined>(
        apiServerUrl + '/store/upload/status/' + submissionId + '/' + status,
        undefined,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'PUT',
        }
    );
}