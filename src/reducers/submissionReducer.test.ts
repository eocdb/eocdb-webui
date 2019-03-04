import { submissionReducer } from "./submissionReducer";
import {
    CLOSE_SUBMIT_STEPS,
    OPEN_SUBMIT_STEPS,
    SEND_SUBMISSION,
    SendSubmission, UPDATE_CURRENT_SUBMISSION,
    UPDATE_DATA_FILES,
    UPDATE_DOC_FILES,
    UPDATE_SUBMISSION_ID, UpdateCurrentSubmission,
    UpdateDataFiles,
    UpdateDocFiles,
    UpdateSubmissionId
} from "../actions/submissionActions";


describe('submitStepsReducer', () => {
    it('submissionReducer to open submit steps', () => {
        const result = submissionReducer(undefined, {type: OPEN_SUBMIT_STEPS});
        expect(result.submissionOpen).toEqual(true);
    });

    it('submissionReducer to close submit steps', () => {
        const result = submissionReducer(undefined, {type: CLOSE_SUBMIT_STEPS});
        expect(result.submissionOpen).toEqual(false);
    });

    it('reducing updateSubmissionId', () => {
        const action: UpdateSubmissionId = {
            type: UPDATE_SUBMISSION_ID,
            submissionId: '',
        };
        const result = submissionReducer(undefined, action);
        expect(result.submissionId).toEqual('');
    });

    it('reducing updateDataFiles', () => {
        const action: UpdateDataFiles = {
            type: UPDATE_DATA_FILES,
            dataFiles: [],
        };
        const result = submissionReducer(undefined, action);
        expect(result.dataFiles.length).toEqual(0);
    });

    it('reducing updateDocFiles', () => {
        const action: UpdateDocFiles = {
            type: UPDATE_DOC_FILES,
            docFiles: [],
        };
        const result = submissionReducer(undefined, action);
        expect(result.dataFiles.length).toEqual(0);
    });

    it('reducing updateCurrentSubmission', () => {
        const action: UpdateCurrentSubmission = {
            type: UPDATE_CURRENT_SUBMISSION,
            currentSubmissionId: '',
            currentSubmissionFiles: [],
        };
        const result = submissionReducer(undefined, action);
        expect(result.currentSubmissionId).toEqual('');
        expect(result.currentSubmissionFiles).toEqual([]);
    });


    it('submissionReducer to submit files', () => {
        const action: SendSubmission = {
            type: SEND_SUBMISSION,
            currentDatasetValidationResults: [],
        };
        const result = submissionReducer(undefined, action);
        expect(result.dataFiles.length).toEqual(0);
        expect(result.docFiles.length).toEqual(0);
    });

});

