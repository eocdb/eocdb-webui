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
    currentSubmissionId: string;

    foundSubmissions: Submission[];

    submissionFilesDialogOpen: boolean;
    submissionIssuesDialogOpen: boolean;
}

export function newSubmissionState() {
    return {
        submissionOpen: false,
        submissionFilesDialogOpen: false,
        submissionIssuesDialogOpen: false,

        submissionId: '',
        dataFiles: [],
        docFiles: [],
        path: '',

        currentDatasetValidationResults: [],
        currentSubmissionFiles: [],
        currentSubmissionId: '',

        foundSubmissions: [],
    }
}
