import {
    CLOSE_SUBMIT_STEPS,
    closeSubmitSteps,
    OPEN_SUBMIT_STEPS,
    openSubmitSteps
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
});