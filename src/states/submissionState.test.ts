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

            currentDatasetValidationResults: [],
            currentSubmissionFiles: [],
            foundSubmissions: [],
        };

        expect(newSubmissionState()).toEqual(expected);
    });
});