import { Dataset } from "../model";
import { LatLngBounds } from "leaflet";

export interface PlotRecord {
  x: number | null;
  y: number | null;
  z?: number | null;
}

export interface PlotState {
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
  termsSingleDialogOpen: boolean;
  termsDownloadDialogOpen: boolean;

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
    termsDownloadDialogOpen: false,
    termsSingleDialogOpen: false,   
    downloadDocs: false,

    dataset: {
      id: "",
      path: "",
      filename: "",
      metadata: new Map(),
      records: [],
      longitudes: [],
      latitudes: [],
      attributes: [],
      times: [],
    },
    selectedDatasets: [],
    downloading: false,

    plotState: {
      selectedXField: "",
      selectedYField: "",
      selectedZField: "",
    },

    plotData: [],
  };
}
