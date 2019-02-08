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
    SUBMIT_FILES,
    _submitFiles,
    CLEAR_FORM,
    clearForm,
    UPDATE_SUBMISSIONSFILES_FOR_SUBMISSION,
    _updateSubmissionFilesForSubmission,
    UPDATE_SUBMISSIONS_FOR_USER,
    _updateSubmissionsForUser,
}
    from "./submissionActions";

describe("submitActions", () => {
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
            type: CLEAR_FORM,
        };

        expect(clearForm()).toEqual(expectedAction);
    });

    it("_submitFiles", () => {
        const expectedAction = {
            type: SUBMIT_FILES,
            currentDatasetValidationResults: [],
        };

        expect(_submitFiles([])).toEqual(expectedAction);
    });

    it("_updateSubmissionsForUser", () => {
        const expectedAction = {
            type: UPDATE_SUBMISSIONS_FOR_USER,
            submissions: [],
        };

        expect(_updateSubmissionsForUser([])).toEqual(expectedAction);
    });

    it("_updateSubmissionFilesForSubmission", () => {
        const expectedAction = {
            type: UPDATE_SUBMISSIONSFILES_FOR_SUBMISSION,
            submissionId: '',
        };

        expect(_updateSubmissionFilesForSubmission([])).toEqual(expectedAction);
    });

});