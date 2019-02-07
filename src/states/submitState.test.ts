import { newSubmitState } from "./submitState";

describe('submitState', () => {
    it('newSubmitState', () => {
        const expected = {
            submitStepsOpen: false,

            submissionId: '',
            dataFiles: [],
            docFiles: [],

            datasetValidationResult: [],
            foundSubmissions: [],
        };

        expect(newSubmitState()).toEqual(expected);
    });
});