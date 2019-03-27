import { callBlobApi } from "./callApi";


export function downloadSubmissionFile(apiServerUrl: string, submission_id: string, index: number)
    : Promise<Blob> {
    return callBlobApi(apiServerUrl + '/store/download/submisisonfile/' + submission_id + '/' + index,
        undefined);
}