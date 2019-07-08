import { callApi } from "./callApi";


export function updateSubmission(apiServerUrl: string, submissionId: string, uploadData: any):
    Promise<Response>{

    return callApi(
        apiServerUrl + '/store/upload/submission/' + submissionId ,
        undefined,
        {
            method: 'PUT',
            body: JSON.stringify(uploadData),
        },
    );
}