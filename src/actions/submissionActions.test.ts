import {
    CLOSE_SUBMIT_STEPS,
    OPEN_SUBMIT_STEPS,
    closeSubmitSteps,
    openSubmitSteps,
    UPDATE_DATA_FILES,
    updateDataFiles,
    updateDocFiles,
    UPDATE_DOC_FILES,
    UPDATE_SUBMISSION_ID,
    updateSubmissionId,
    SEND_SUBMISSION,
    _sendSubmission,
    UPDATE_SUBMISSIONS_FOR_USER,
    updateSubmissionsForUser,
    CLEAR_SUBMISSION_FORM,
    clearSubmissionForm, UPDATE_SELECTED_SUBMISSION,
    updateSelectedSubmission,
}
    from "./submissionActions";

describe("submissionActions", () => {
    it("openSubmitActions", () => {
        const expectedAction = {
            type: OPEN_SUBMIT_STEPS,
        };

        expect(openSubmitSteps()).toEqual(expectedAction);
    });

    it("closeSubmitActions", () => {
        const expectedAction = {
            type: CLOSE_SUBMIT_STEPS,
        };

        expect(closeSubmitSteps()).toEqual(expectedAction);
    });

    it("updateSubmissionId", () => {
        const expectedAction = {
            type: UPDATE_SUBMISSION_ID,
            submissionId: '',
        };

        expect(updateSubmissionId('')).toEqual(expectedAction);
    });

    it("updateDataFiles", () => {
        const expectedAction = {
            type: UPDATE_DATA_FILES,
            dataFiles: [],
        };

        expect(updateDataFiles([])).toEqual(expectedAction);
    });

    it("updateDocFiles", () => {
        const expectedAction = {
            type: UPDATE_DOC_FILES,
            docFiles: [],
        };

        expect(updateDocFiles([])).toEqual(expectedAction);
    });

    it("clearForm", () => {
        const expectedAction = {
            type: CLEAR_SUBMISSION_FORM,
        };

        expect(clearSubmissionForm()).toEqual(expectedAction);
    });

    it("_sendSubmission", () => {
        const expectedAction = {
            type: SEND_SUBMISSION,
            currentDatasetValidationResults: [],
        };

        expect(_sendSubmission([])).toEqual(expectedAction);
    });

    it("_updateSubmissionsForUser", () => {
        const expectedAction = {
            type: UPDATE_SUBMISSIONS_FOR_USER,
            submissionResult: {
                submissions: [],
                tot_count: 0,
            }
        };

        expect(updateSubmissionsForUser({submissions: [], tot_count: 0})).toEqual(expectedAction);
    });

    it("_updateSubmission", () => {
        const submission = {
            submission_id: '',
            user_id: 0,
            date: '',
            path: '',
            status: '',
            files: [],
            file_refs: [],
            publication_date: '',
            allow_publication: false,
        };


        const expectedAction = {
            type: UPDATE_SELECTED_SUBMISSION,
            submission,
        };

        expect(updateSelectedSubmission(submission)).toEqual(expectedAction);
    });

});
