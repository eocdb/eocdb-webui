import { DatasetValidationResult } from "../api/uploadStoreFiles";
import { SubmissionForUserResult } from "../api/getSubmissionFilesForUser";

export interface SubmitState {
    submissionOpen: boolean;

    submissionId: string;
    dataFiles: File[];
    docFiles: File[];
    path: string;

    datasetValidationResults: DatasetValidationResult[];
    foundSubmissions: SubmissionForUserResult[];
}

export function newSubmitState() {
    return {
        submissionOpen: false,

        submissionId: '',
        dataFiles: [],
        docFiles: [],
        path: '',

        datasetValidationResults: [],
        foundSubmissions: [],
    }
}
