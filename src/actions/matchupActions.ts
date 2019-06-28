//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_SELECTED_ROW_DATA = 'UPDATE_SELECTED_ROW_DATA';
export type UPDATE_SELECTED_ROW_DATA = typeof UPDATE_SELECTED_ROW_DATA;

export interface UpdateSelectedRowData {
    type: UPDATE_SELECTED_ROW_DATA;
    selectedRowData: string[];
}

export function updateSelectedRowData(selectedRowData: string[]): UpdateSelectedRowData {
    return {type: UPDATE_SELECTED_ROW_DATA, selectedRowData}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_TERMS_DIALOG = 'OPEN_TERMS_DIALOG';
export type OPEN_TERMS_DIALOG = typeof OPEN_TERMS_DIALOG;

export interface OpenTermsDialog {
    type: OPEN_TERMS_DIALOG;
}

export function openTermsDialog(): OpenTermsDialog {
    return {type: OPEN_TERMS_DIALOG};
}

export const CLOSE_TERMS_DIALOG = 'CLOSE_TERMS_DIALOG';
export type CLOSE_TERMS_DIALOG = typeof CLOSE_TERMS_DIALOG;

export interface CloseTermsDialog {
    type: CLOSE_TERMS_DIALOG;
}

export function closeTermsDialog(): CloseTermsDialog {
    return {type: CLOSE_TERMS_DIALOG};
}

export type MatchupActions = CloseTermsDialog | OpenTermsDialog | UpdateSelectedRowData;