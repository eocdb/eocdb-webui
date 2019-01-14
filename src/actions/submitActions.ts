/**
* @file submitActions.ts
* @brief Actions for submitting data files (SubmitPanel.tsx)
* @author: Brockmann Consult
* @date 14/01/2019
*/

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

export type SubmitAction = OpenSubmitSteps | CloseSubmitSteps;