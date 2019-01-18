import {
    CLOSE_SUBMIT_STEPS,
    OPEN_SUBMIT_STEPS,
    SET_ACTIVE_STEP_DOWN,
    SET_ACTIVE_STEP_UP,

    closeSubmitSteps,
    openSubmitSteps,
    setActiveStepDown,
    setActiveStepUp
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

    it("setActiveStepUp", () => {
        const expectedAction = {
            type: SET_ACTIVE_STEP_UP,
        };

        expect(setActiveStepUp()).toEqual(expectedAction);
    });

    it("setActiveStepDown", () => {
        const expectedAction = {
            type: SET_ACTIVE_STEP_DOWN,
        };

        expect(setActiveStepDown()).toEqual(expectedAction);
    });
});