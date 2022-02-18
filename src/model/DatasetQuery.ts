import { MeasurementType, ProductMode } from "../api/findDatasets";
import { SliderRange } from "../types/advancedSearchDialog";
import { BBoxValue } from "../components/search/BBoxInput";

export const SELECTED_BOUNDS_DEFAULT: BBoxValue = ['', '', '', ''];

export enum PG_TYPE {
    first,
    next,
    previous,
    last,
    unknown
}


export interface DatasetQuery {
    selectedBBox: BBoxValue,
    searchExpr?: string;
    startDate?: string;
    endDate?: string;
    region?: string;
    submission_id?: string;
    status?: string;
    user_id?: number;
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
    last_id?: string;
    pgType: PG_TYPE;
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
    last_id: null,
    pgType: PG_TYPE.unknown,
    offset: 0,
    count: 0,
    geojson: true
}
