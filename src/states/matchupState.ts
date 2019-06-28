export interface MatchupState {
    selectedRowData: string[];
    termsDialogOpen: boolean;
}

export function newMatchupState() {
    return {
        selectedRowData: [],
        termsDialogOpen: false,
    };
}