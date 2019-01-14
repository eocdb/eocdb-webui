export interface SubmitState {
    submitStepsOpen: boolean;
}

export function newSubmitState() {
    return {
        submitStepsOpen: false,
    }
}