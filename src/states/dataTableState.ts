import { Dataset } from "../model";
import { LatLngBounds } from "leaflet";


export interface PlotRecord {
    x: number;
    y: number;
    z?: number;
}

export interface PlotState{
    selectedXField: string;
    selectedYField: string;
    selectedZField: string;
}

export interface DataTableState {
    page: number;
    rowsPerPage: number;

    metaInfoDialogOpen: boolean;
    plotDialogOpen: boolean;
    termsDialogOpen: boolean;

    dataset: Dataset;

    selectedDatasets: string[];
    downloadDocs: boolean;

    downloading: boolean;

    plotState: PlotState;
    plotData: PlotRecord[];

    selectedBounds?: LatLngBounds;
}

export function newDataTableState() {
    return {
        page: 0,
        rowsPerPage: 5,

        metaInfoDialogOpen: false,
        plotDialogOpen: false,
        termsDialogOpen: false,
        downloadDocs: false,

        dataset: {
            id: "",
            path: '',
            metadata: new Map(),
            records: [],
            longitudes: [],
            latiudes: [],
            attributes: [],
            times: [],
        },
        selectedDatasets: [],
        downloading: false,

        plotState: {
            selectedXField: '',
            selectedYField: '',
            selectedZField: '',
        },

        plotData: [],
    }
}