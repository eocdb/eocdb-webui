//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const UPDATE_DATA_PAGE = 'UPDATE_DATA_PAGE';
export type UPDATE_DATA_PAGE = typeof UPDATE_DATA_PAGE;

export interface UpdateDataPage {
    type: UPDATE_DATA_PAGE;
    page: number;
}

export function updateDataPage(selectedPage: number): UpdateDataPage{
    return {type: UPDATE_DATA_PAGE, page: selectedPage};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const UPDATE_DATA_ROWS_PER_PAGE = 'UPDATE_DATA_ROWS_PER_PAGE';
export type UPDATE_DATA_ROWS_PER_PAGE = typeof UPDATE_DATA_ROWS_PER_PAGE;

export interface UpdateDataRowsPerPage {
    type: UPDATE_DATA_ROWS_PER_PAGE;
    rowsPerPage: number;
}

export function updateDataRowsPerPage (selectedRowsPerPage: number): UpdateDataRowsPerPage{
    return {type: UPDATE_DATA_ROWS_PER_PAGE, rowsPerPage: selectedRowsPerPage};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_METAINFO_DIALOG = 'OPEN_METAINFO_DIALOG';
export type OPEN_METAINFO_DIALOG = typeof OPEN_METAINFO_DIALOG;

export interface OpenMetaInfoDialog {
    type: OPEN_METAINFO_DIALOG;
}

export function openMetaInfoDialog (): OpenMetaInfoDialog{
    return {type: OPEN_METAINFO_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export const CLOSE_METAINFO_DIALOG = 'CLOSE_METAINFO_DIALOG';
export type CLOSE_METAINFO_DIALOG = typeof CLOSE_METAINFO_DIALOG;

export interface CloseMetaInfoDialog {
    type: CLOSE_METAINFO_DIALOG;
}

export function closeMetaInfoDialog (): CloseMetaInfoDialog{
    return {type: CLOSE_METAINFO_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type DataTableAction = UpdateDataPage | UpdateDataRowsPerPage | OpenMetaInfoDialog | CloseMetaInfoDialog;