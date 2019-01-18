export interface SubmitState {
    submitStepsOpen: boolean;
    activeStep: number;
}

export function newSubmitState() {
    return {
        submitStepsOpen: false,
        activeStep: 0,
    }
}
