import { newDataTableState, DataTableState } from "../states/dataTableState";
import {
    UPDATE_DATA_PAGE,
    UPDATE_DATA_ROWS_PER_PAGE,
    CLOSE_METAINFO_DIALOG,
    OPEN_METAINFO_DIALOG,
    OPEN_PLOT_DIALOG,
    CLOSE_PLOT_DIALOG,
    DataTableAction,
    UPDATE_DOWNLOAD_DOCS,
    UPDATE_DATASET,
    UPDATE_SELECTED_DATASETS,
    STOP_DOWNLOADING,
    START_DOWNLOADING,
    UPDATE_PLOT_STATE,
    UPDATE_PLOT_DATA,
    OPEN_TERMS_DIALOG,
    CLOSE_TERMS_DIALOG,
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
        case OPEN_PLOT_DIALOG: {
            return {...state, plotDialogOpen: true};
        }
        case CLOSE_PLOT_DIALOG: {
            return {...state, plotDialogOpen: false};
        }
        case OPEN_TERMS_DIALOG: {
            return {...state, termsDialogOpen: true};
        }
        case CLOSE_TERMS_DIALOG: {
            return {...state, termsDialogOpen: false};
        }
        case UPDATE_DATASET: {
            return {...state, dataset: action.dataset}
        }
        case UPDATE_DOWNLOAD_DOCS: {
            return {...state, downloadDocs: action.downloadDocs};
        }
        case UPDATE_SELECTED_DATASETS: {
            return {...state, selectedDatasets: action.selectedDatasets, selectedBounds: action.selectedBounds}
        }
        case START_DOWNLOADING:{
            return {...state, downloading: action.downloading}
        }
        case STOP_DOWNLOADING:{
            return {...state, downloading: action.downloading}
        }
        case UPDATE_PLOT_STATE: {
            return {...state, plotState: action.plotState}
        }
        case UPDATE_PLOT_DATA:{
            return {...state, plotData: action.plotData}
        }
    }
    return state;
}
