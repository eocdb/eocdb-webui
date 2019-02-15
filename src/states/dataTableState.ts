import { Dataset } from "../types/dataset";


export interface PlotRecord {
    x: number;
    y: number;
    z: number|null;
}


export interface PlotState{
    selectedXField: string;
    selectedYField: string;
    selectedZField: string;

    plotRecords: PlotRecord[];
}

export interface DataTableState {
    page: number;
    rowsPerPage: number;

    metaInfoDialogOpen: boolean;
    plotDialogOpen: boolean;

    dataset: Dataset;

    selectedDatasets: string[];
    downloadDocs: boolean;

    downloading: boolean;

    plotState: PlotState;
}

export function newDataTableState() {
    return {
        page: 0,
        rowsPerPage: 5,

        metaInfoDialogOpen: false,
        plotDialogOpen: false,
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
            plotRecords: [],
        }
    }
}