import { Submission, SubmissionFile, DatasetValidationResult } from "../model";

export interface SubmissionState {
    submissionDialogOpen: boolean;
    submissionFilesDialogOpen: boolean;
    submissionFileIssueDialogOpen: boolean;
    deleteSubmissionFileAlertOpen: boolean;

    selectedSubmission: Submission;
    selectedSubmissionFile: SubmissionFile;

    submissionId: string;
    dataFiles: File[];
    docFiles: File[];
    path: string;

    currentDatasetValidationResults: DatasetValidationResult[];
    currentSubmissionFiles: SubmissionFile[];
    currentSubmissionId: string;

    foundSubmissions: Submission[];


}

export function newSubmissionState() {
    return {
        foundSubmissions: [],

        submissionDialogOpen: false,
        submissionFilesDialogOpen: false,
        submissionFileIssueDialogOpen: false,
        deleteSubmissionFileAlertOpen: false,

        submissionId: '',
        dataFiles: [],
        docFiles: [],
        path: '',

        currentDatasetValidationResults: [],
        currentSubmissionFiles: [],
        currentSubmissionId: '',

        selectedSubmission: {
            submission_id: '',
            user_id: 0,
            date: '',
            status: '',
            files: [],
            file_refs: [],
        },

        selectedSubmissionFile: {
            index: 0,
            submission_id: '',
            filename: '',
            status: 'OK',
            filetype: 'DOCUMENT',
            result: {
                status: 'OK',
                issues: [],
            }
        },
    }
}
