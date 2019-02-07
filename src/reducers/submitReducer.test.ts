import { submitReducer } from "./submitReducer";
import {
    CLOSE_SUBMIT_STEPS,
    OPEN_SUBMIT_STEPS,
    SUBMIT_FILES,
    SubmitFiles,
    UPDATE_DATA_FILES,
    UPDATE_DOC_FILES,
    UPDATE_SUBMISSION_ID,
    UpdateDataFiles,
    UpdateDocFiles,
    UpdateSubmissionId
} from "../actions/submitActions";


describe('submitStepsReducer', () => {
    it('submitReducer to open submit steps', () => {
        const result = submitReducer(undefined, {type: OPEN_SUBMIT_STEPS});
        expect(result.submissionOpen).toEqual(true);
    });

    it('submitReducer to close submit steps', () => {
        const result = submitReducer(undefined, {type: CLOSE_SUBMIT_STEPS});
        expect(result.submissionOpen).toEqual(false);
    });

    it('reducing updateSubmissionId', () => {
        const action: UpdateSubmissionId = {
            type: UPDATE_SUBMISSION_ID,
            submissionId: '',
        };
        const result = submitReducer(undefined, action);
        expect(result.submissionId).toEqual('');
    });

    it('reducing updateDataFiles', () => {
        const action: UpdateDataFiles = {
            type: UPDATE_DATA_FILES,
            dataFiles: [],
        };
        const result = submitReducer(undefined, action);
        expect(result.dataFiles.length).toEqual(0);
    });

    it('reducing updateDocFiles', () => {
        const action: UpdateDocFiles = {
            type: UPDATE_DOC_FILES,
            docFiles: [],
        };
        const result = submitReducer(undefined, action);
        expect(result.dataFiles.length).toEqual(0);
    });

    it('submitReducer to submit files', () => {
        const action: SubmitFiles = {
            type: SUBMIT_FILES,
            datasetValidationResults: [],
        };
        const result = submitReducer(undefined, action);
        expect(result.dataFiles.length).toEqual(0);
        expect(result.docFiles.length).toEqual(0);
    });

});

