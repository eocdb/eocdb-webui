import { newSubmissionState } from "./submissionState";

describe('submitState', () => {
    it('newSubmissionState', () => {
        const expected = {
            submissionOpen: false,

            submissionId: '',
            dataFiles: [],
            docFiles: [],
            path: '',
            submissionFilesDialogOpen: false,
            submissionIssuesDialogOpen: false,

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