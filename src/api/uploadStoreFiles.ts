import { callJsonApi } from "./callApi";

export type DatasetStatus = "OK" | "WARNING" | "ERROR";
export type DatasetIssueType = "WARNING" | "ERROR";

export interface UploadData {
    dataFiles: File[];
    docFiles: File[];
    submissionId: string;
}

export interface DatasetIssue {
    type: DatasetIssueType;
    description: string;
}

export interface DatasetValidationResult {
    status: DatasetStatus;
    issues: DatasetIssue [];
}

export function uploadStoreFiles(apiServerUrl: string, uploadData: UploadData)
    : Promise<DatasetValidationResult[]> {

    const uploadPostData = {
        datafiles: uploadData.dataFiles,
        docFiles: uploadData.docFiles,
        submissionid: uploadData.submissionId,
    };

    return callJsonApi<DatasetValidationResult[]>(apiServerUrl + '/store/upload',
        undefined,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(uploadPostData),
        });
}