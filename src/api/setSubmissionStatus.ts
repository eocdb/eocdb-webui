import { callApi } from "./callApi";


export function setSubmissionStatus(apiServerUrl: string, submissionId: string, status: string):
    Promise<Response>{


    return callApi(
        apiServerUrl + '/store/status/submission/' + submissionId,
        undefined,
        {
            method: 'PUT',
            body: JSON.stringify({status: status}),
        },
    );
}