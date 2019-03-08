import { callApi } from "./callApi";


export function setSubmissionStatus(apiServerUrl: string, submissionId: string, status: string):
    Promise<Response>{

    return callApi(
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