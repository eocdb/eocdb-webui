import { callApi } from './callApi';
import { UploadData } from "../model/UploadData";
import { SubmissionFile } from "../model/SubmissionFile";


/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param submissionFile: submission file
 * @param uploadData: interface to uploadData. Contains file names, user name, submission id, path
 */
export function updateSubmissionFile(
    apiServerUrl: string,
    submissionFile: SubmissionFile,
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

    let headers = new Headers();

    headers.append('Content-Type', 'text/json');
    headers.append('Authorization', 'Basic ' + btoa('eumes8t:se8b8ss'));

    return callApi(
        apiServerUrl + '/store/upload/submissionfile/' + submissionFile.submission_id + '/' + submissionFile.index,
        undefined,
        {
            method: 'PUT',
            body: formData,
        }
    );
}
