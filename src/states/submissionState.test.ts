import { newSubmissionState } from "./submissionState";

describe('submitState', () => {
    it('newSubmissionState', () => {
        const expected = {
            submissionDialogOpen: false,
            submissionFilesDialogOpen: false,
            submissionFileIssueDialogOpen: false,
            deleteSubmissionFileAlertOpen: false,
            deleteSubmissionAlertOpen: false,
            uploadSubmissionFileDialogOpen: false,

            submissionId: '',
            dataFiles: [],
            docFiles: [],
            path: '',

            currentSubmission: {
                submission_id: '',
                user_id: 0,
                date: '',
                status: '',
                files: [],
                file_refs: [],
            },

            currentSubmissionFile: {
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
            currentSubmissionFileIndex: 0,

            currentDatasetValidationResults: [],
            currentSubmissionFiles: [],
            currentSubmissionId: '',
            foundSubmissions: [],
        };

        expect(newSubmissionState()).toEqual(expected);
    });
});