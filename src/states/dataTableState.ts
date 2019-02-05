import { Dataset } from "../types/dataset";

export interface DataTableState {
    page: number;
    rowsPerPage: number;

    metaInfoDialogOpen: boolean;
    plotDialogOpen: boolean;

    dataset: Dataset;

    selectedDatasets: string[];
    downloadDocs: boolean;

    downloading: boolean;
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
    }
}