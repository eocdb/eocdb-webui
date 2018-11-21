import { newDataTableState, DataTableState } from "../states/dataTableState";
import {
    UPDATE_DATA_PAGE,
    UPDATE_DATA_ROWS_PER_PAGE,
    CLOSE_METAINFO_DIALOG,
    OPEN_METAINFO_DIALOG,
    UPDATE_DATASET,
    DataTableAction
} from "../actions/dataTableActions";


const initialState = newDataTableState();

export function dataTableReducer(state: DataTableState, action: DataTableAction): DataTableState {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case UPDATE_DATA_PAGE: {
            return {...state, page: action.page};
        }
        case UPDATE_DATA_ROWS_PER_PAGE: {
            return {...state, rowsPerPage: action.rowsPerPage};
        }
        case OPEN_METAINFO_DIALOG: {
            return {...state, metaInfoDialogOpen: true};
        }
        case CLOSE_METAINFO_DIALOG: {
            return {...state, metaInfoDialogOpen: false};
        }
        case UPDATE_DATASET: {
            return {...state, dataset: action.dataset}
        }
    }
    return state;
}
