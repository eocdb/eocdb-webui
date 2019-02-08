import { newSubmissionState } from "./submissionState";

describe('submitState', () => {
    it('newSubmissionState', () => {
        const expected = {
            submissionOpen: false,

            submissionId: '',
            dataFiles: [],
            docFiles: [],
            path: '',

            currentDatasetValidationResults: [],
            currentSubmissionFiles: [],
            foundSubmissions: [],
        };

        expect(newSubmissionState()).toEqual(expected);
    });
});