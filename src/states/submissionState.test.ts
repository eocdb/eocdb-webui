import { newSubmissionState } from "./submissionState";

describe('submitState', () => {
    it('newSubmissionState', () => {
        const expected = {
            submitStepsOpen: false,

            submissionId: '',
            dataFiles: [],
            docFiles: [],

            datasetValidationResult: [],
            foundSubmissions: [],
        };

        expect(newSubmissionState()).toEqual(expected);
    });
});