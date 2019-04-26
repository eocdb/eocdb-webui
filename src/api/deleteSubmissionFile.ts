import { callApi } from "./callApi";


export function deleteSubmissionFile(apiServerUrl: string, submissionId: string, submissionFileIndex: number):
    Promise<Response> {

    return callApi(
        apiServerUrl + '/store/upload/submissionfile/' + submissionId + '/' + submissionFileIndex,
        undefined,
        {
            method: 'DELETE',
        }
    );
}