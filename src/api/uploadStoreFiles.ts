import { callJsonApi } from "./callApi";
import { UploadData, DatasetValidationResult } from "../model";


export function uploadStoreFiles(apiServerUrl: string, uploadData: UploadData)
    : Promise<DatasetValidationResult[]> {

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
    if(uploadData.publicationDate){
        formData.append('publicationdate', uploadData.publicationDate);
    }

    return callJsonApi<DatasetValidationResult[]>(apiServerUrl + '/store/upload/submission',
        undefined,
        {
            method: 'POST',
            body: formData,
        });
}