import { Submission, SubmissionFile, DatasetValidationResult } from "../model";
import { MessageLogEntry } from "./messageLogState";

export interface SubmissionState {
    submissionDialogOpen: boolean;
    submissionFilesDialogOpen: boolean;
    submissionMetaDialogOpen: boolean;
    submissionFileIssueDialogOpen: boolean;
    deleteSubmissionFileAlertOpen: boolean;
    deleteSubmissionAlertOpen: boolean,
    uploadSubmissionFileDialogOpen: boolean,
    setSubmissionPublicationDateDialogOpen: boolean,

    selectedSubmission: Submission;
    selectedSubmissionFile: SubmissionFile;

    submissionId: string;
    dataFiles: File[];
    docFiles: File[];
    path: string;
    publicationDate: string | null;
    allowPublication: boolean;

    currentDatasetValidationResults: DatasetValidationResult[];
    currentSubmissionFiles: SubmissionFile[];
    currentSubmissionId: string;

    foundSubmissions: Submission[];

    helpDialogOpen: boolean;

    submissionPublicationDate: string | null;

    submissionSucceeded: boolean;

    submissionMessages: MessageLogEntry[];
}

export function newSubmissionState() {
    return {
        foundSubmissions: [],

        submissionDialogOpen: false,
        submissionFilesDialogOpen: false,
        submissionMetaDialogOpen: false,
        submissionFileIssueDialogOpen: false,
        deleteSubmissionFileAlertOpen: false,
        deleteSubmissionAlertOpen: false,
        uploadSubmissionFileDialogOpen: false,
        setSubmissionPublicationDateDialogOpen: false,

        submissionId: '',
        dataFiles: [],
        docFiles: [],
        path: '',
        publicationDate: null,
        allowPublication: false,

        currentDatasetValidationResults: [],
        currentSubmissionFiles: [],
        currentSubmissionId: '',

        selectedSubmission: {
            submission_id: '',
            user_id: 0,
            date: '',
            path: '',
            status: '',
            files: [],
            file_refs: [],
            publication_date: '',
            allow_publication: false
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

        helpDialogOpen: false,
        submissionPublicationDate: null,

        submissionSucceeded: false,
        submissionMessages: [],
        newEntries: [],
        oldEntries: [],
    }
}
