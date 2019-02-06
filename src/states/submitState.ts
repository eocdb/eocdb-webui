export interface SubmitState {
    submitStepsOpen: boolean;

    dataFiles: File[];
    docFiles: File[];
}

export function newSubmitState() {
    return {
        submitStepsOpen: false,

        dataFiles: [],
        docFiles: [],
    }
}
