import {
    CLOSE_SUBMIT_STEPS,
    OPEN_SUBMIT_STEPS,
    closeSubmitSteps,
    openSubmitSteps,
    UPDATE_DATA_FILES,
    updateDataFiles,
    updateDocFiles,
    UPDATE_DOC_FILES, UPDATE_SUBMISSION_ID, updateSubmissionId,
}
    from "./submitActions";

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

});