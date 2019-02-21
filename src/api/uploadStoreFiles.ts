import { callJsonApi } from "./callApi";

export type DatasetStatus = "OK" | "WARNING" | "ERROR";
export type DatasetIssueType = "WARNING" | "ERROR";


export interface UploadData {
    dataFiles: File[];
    docFiles: File[];
    submissionId: string;
    path: string;
}

export interface DatasetIssue {
    type: DatasetIssueType;
    description: string;
}

export interface DatasetValidationResult {
    status: string;
    issues: DatasetIssue [];
}

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

    return callJsonApi<DatasetValidationResult[]>(apiServerUrl + '/store/upload',
        undefined,
        {
            method: 'POST',
            body: formData,
        });
}