import { MeasurementType, ProductMode } from "../api/findDatasets";
import { SliderRange } from "../types/advancedSearchDialog";
import { BBoxValue } from "../components/search/BBoxInputDialog";

export const SELECTED_BOUNDS_DEFAULT: BBoxValue = ['', '', '', ''];

export interface DatasetQuery {
    selectedBBox: BBoxValue,
    searchExpr?: string;
    startDate?: string;
    endDate?: string;
    region?: string;
    submission_id?: string;
    status?: string;
    user_id?: string;
    productMode?: ProductMode;
    productNames: string[];
    productGroupNames: string[];
    measurementType?: MeasurementType;
    mtype?: string,
    wavelengthsMode?: string;
    wdepth?: SliderRange;
    hasWdepth: boolean;
    shallow?: string;
    datasetIds?: string[];
    offset?: number;
    count?: number;
    geojson?: boolean;
}


export const DefaultDatasetQuery: DatasetQuery = {
    selectedBBox: SELECTED_BOUNDS_DEFAULT,
    searchExpr: null,
    startDate: null,
    endDate: null,
    region: null,
    submission_id: null,
    status: null,
    user_id: null,
    productMode: null,
    productNames: [],
    productGroupNames: [],
    measurementType: null,
    mtype: null,
    wavelengthsMode: null,
    wdepth: [null, null],
    hasWdepth: false,
    shallow: null,
    datasetIds: [],
    offset: 0,
    count: 0,
    geojson: true
}
