/**
* @file submitActions.ts
* @brief Actions for submitting data files (SubmitPanel.tsx)
* @author: Brockmann Consult
* @date 14/01/2019
*/


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SET_ACTIVE_STEP_UP = 'SET_ACTIVE_STEP_UP';
export type SET_ACTIVE_STEP_UP = typeof SET_ACTIVE_STEP_UP;

export interface SetActiveStepUp {
    type: SET_ACTIVE_STEP_UP;
}


/**
 * Set submit step
 */
export function setActiveStepUp(): SetActiveStepUp {
    return {type: SET_ACTIVE_STEP_UP};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const SET_ACTIVE_STEP_DOWN = 'SET_ACTIVE_STEP_DOWN';
export type SET_ACTIVE_STEP_DOWN = typeof SET_ACTIVE_STEP_DOWN;

export interface SetActiveStepDown {
    type: SET_ACTIVE_STEP_DOWN;
}


/**
 * Set submit step
 */
export function setActiveStepDown(): SetActiveStepDown {
    return {type: SET_ACTIVE_STEP_DOWN};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLOSE_SUBMIT_STEPS = 'CLOSE_SUBMIT_STEPS';
export type CLOSE_SUBMIT_STEPS = typeof CLOSE_SUBMIT_STEPS;

export interface CloseSubmitSteps {
    type: CLOSE_SUBMIT_STEPS;
}


/**
 * Close/cancel the file submit process
 */
export function closeSubmitSteps(): CloseSubmitSteps {
    return {type: CLOSE_SUBMIT_STEPS};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_SUBMIT_STEPS = 'OPEN_SUBMIT_STEPS';
export type OPEN_SUBMIT_STEPS = typeof OPEN_SUBMIT_STEPS;

export interface OpenSubmitSteps {
    type: OPEN_SUBMIT_STEPS;
}

/**
 * Open the file submit process
 */
export function openSubmitSteps(): OpenSubmitSteps {
    return {type: OPEN_SUBMIT_STEPS};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type SubmitAction = OpenSubmitSteps | CloseSubmitSteps | SetActiveStepUp | SetActiveStepDown ;