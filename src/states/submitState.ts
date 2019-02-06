export interface SubmitState {
    submitStepsOpen: boolean;

    submissionId: string;
    dataFiles: File[];
    docFiles: File[];
}

export function newSubmitState() {
    return {
        submitStepsOpen: false,

        submissionId: '',
        dataFiles: [],
        docFiles: [],
    }
}
