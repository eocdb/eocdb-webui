import { callApi } from './callApi';
import { UploadData } from "../model/UploadData";


/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param submissionId: ID of the submission
 * @param submissionFileIndex: Index of a submission file in a submission
 * @param uploadData: interface to uploadData. Contains file names, user name, submission id, path
 */
export function updateSubmissionFile(
    apiServerUrl: string,
    submissionId: string,
    submissionFileIndex: number,
    uploadData: UploadData): Promise<Response> {

    let formData  = new FormData();

    for(let file of uploadData.dataFiles) {
        formData.append('datasetfiles', file, file.name);
    }

    for(let file of uploadData.docFiles) {
        formData.append('docfiles', file, file.name);
    }

    formData.append('submissionid', uploadData.submissionId);
    formData.append('path', uploadData.path);
    formData.append('username', uploadData.username);

    return callApi(
        apiServerUrl + '/store/upload/submissionfile/' + submissionId + '/' + submissionFileIndex,
        undefined,
        {
            method: 'PUT',
            body: formData,
        }
    );
}
