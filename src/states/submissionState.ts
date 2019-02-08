import { DatasetValidationResult } from "../api/uploadStoreFiles";
import { Submission } from "../api/getSubmissionsForUser";
import { SubmissionFile } from "../api/getSubmissionFilesForSubmission";

export interface SubmissionState {
    submissionOpen: boolean;

    submissionId: string;
    dataFiles: File[];
    docFiles: File[];
    path: string;

    currentDatasetValidationResults: DatasetValidationResult[];
    currentSubmissionFiles: SubmissionFile[];

    foundSubmissions: Submission[];
}

export function newSubmissionState() {
    return {
        submissionOpen: false,

        submissionId: '',
        dataFiles: [],
        docFiles: [],
        path: '',

        currentDatasetValidationResults: [],
        currentSubmissionFiles: [],
        foundSubmissions: [],
    }
}
