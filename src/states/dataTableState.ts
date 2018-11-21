
export interface DataTableState {
    page: number;
    rowsPerPage: number;

    metaInfoDialogOpen: boolean;
}

export function newDataTableState() {
    return {
        page: 0,
        rowsPerPage: 5,
        metaInfoDialogOpen: false,
    }
}