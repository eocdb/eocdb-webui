import { callApi } from './callApi';
import { SingleUpload } from "../model/UploadData";
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
    uploadData: SingleUpload): Promise<Response> {

    const data = submissionFile.index == -1 ? submissionFile.filetype : submissionFile.index;
    const method = submissionFile.index == -1 ? 'POST' : 'PUT';
    const action = submissionFile.index == -1 ? 'add' : 'upload';
    let formData  = new FormData();

    formData.append('files', uploadData.file, uploadData.file.name);

    formData.append('submissionid', uploadData.submissionId);
    formData.append('path', uploadData.path);
    formData.append('username', uploadData.username);

    return callApi(
        apiServerUrl + '/store/' + action + '/submissionfile/' + submissionFile.submission_id + '/' + data,
        undefined,
        {
            method: method,
            body: formData,
        }
    );
}
