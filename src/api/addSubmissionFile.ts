import { callApi } from './callApi';
import { SingleUpload } from "../model/UploadData";
import { SubmissionFile } from "../model/SubmissionFile";


/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param submissionFile: submission file
 * @param uploadData: interface to uploadData. Contains file names, user name, submission id, path
 */
export function addSubmissionFile(
    apiServerUrl: string,
    submissionFile: SubmissionFile,
    uploadData: SingleUpload): Promise<Response> {

    let formData  = new FormData();

    formData.append('files', uploadData.file, uploadData.file.name);

    formData.append('submissionid', uploadData.submissionId);
    formData.append('path', uploadData.path);
    formData.append('username', uploadData.username);

    return callApi(
        apiServerUrl + '/store/upload/submissionfile/' + submissionFile.submission_id + '/' + submissionFile.filetype,
        undefined,
        {
            method: 'PUT',
            body: formData,
        }
    );
}
