export interface MatchupState {
    selectedRowData: string[];
    termsDialogOpen: boolean;
    messageDialogOpen: boolean;
}

export function newMatchupState() {
    return {
        selectedRowData: [],
        termsDialogOpen: false,
        messageDialogOpen: false,
    };
}
