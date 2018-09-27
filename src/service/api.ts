import { GeoJSON } from 'geojson';

export interface MeasurementType {
    name: string;
    description: string;
}

export interface ProductGroup {
    name: string;
    description: string;
}

export interface Product {
    name: string;
    groupNames: string[];
}

export interface DatasetRef {
    id: string;
    path: string;
}

export interface ContextInfo {
    measurementTypes: MeasurementType[];
    productGroups: ProductGroup[];
    products: Product[];
}


export type BoundingBox = [number, number, number, number];
export type TimeRange = [string, string];
export type WaterDepthRange = [number, number];

export enum ProductFindMode {
    // here: the three SeaBASS find modes
}


/**
 * Dataset search request parameters.
 */
export interface DatasetSearchRequest {
    /**
     * Index of first dataset index for pagination. 1-based.
     */
    startIndex?: number;
    /**
     * Maximum number of datasets to be returned.
     */
    numDatasets?: number;
    queryString?: string;
    bbox?: BoundingBox;
    timeRange?: TimeRange;
    waterDepthRange?: WaterDepthRange;
    measurementType?: string;
    isShallow?: boolean;
    productFindMode?: ProductFindMode;
    productGroups?: string[];
    productNames?: string[];

}

/**
 * Dataset search result.
 */
export interface DatasetSearchResult {
    request: DatasetSearchRequest;
    index: number; // int
    numDatasetsTotal: number; // int
    datasetRefs: DatasetRef[];
}


/**
 * Dataset download request parameters.
 */
export interface DatasetDownloadRequest {
    /**
     * Must be given if datasetIds is omitted.
     */
    queryRequest?: DatasetSearchRequest;
    /**
     * Must be given if queryRequest is omitted.
     */
    datasetIds?: string[];
    includeAllAssocFiles: boolean;
}


/**
 * Dataset plot request parameters.
 */
export interface DatasetPlotRequest {
    datasetId: string;
    paramX: string;
    paramY?: string;
    paramZ?: string;
}


export interface ServiceApi {
    /**
     * Get context information so we can fill lists in search page.
     *
     * @rest /api/context-info
     *
     * @returns {ContextInfo} general information about the data base.
     */
    getContextInfo(): ContextInfo;

    /**
     * Query datasets.
     *
     * @rest /api/datasets?{QueryDatasetRequest}[&{startIndex}[&{numDatasets}]]
     *
     * @SeaBASS: Shows measurement points in a map (new window) --> click point --> show measurement
     * - File Search / Perform File Search

     * @param {DatasetSearchRequest} request The request parameters.
     * @returns {DatasetSearchResult}
     */
    queryDatasets(request: DatasetSearchRequest): DatasetSearchResult;

    /**
     * Get record points as GeoJSON.
     * Used by dedicated OpenLayer GeoJSON data source.
     *
     * @rest /api/datasets/points?{QueryDatasetRequest}
     *
     * @SeaBASS: Shows measurement points in a map (new window) --> click point --> show measurement
     * - File Search / Results/ Map All
     * - File Search / Results/ Map
     *
     * @param {DatasetSearchRequest} request The request parameters.
     * @returns {GeoJSON}
     */
    searchDatasetPoints(request: DatasetSearchRequest): GeoJSON;

    /**
     * Download datasets.
     *
     * @rest /api/datasets/zip?{DatasetDownloadRequest}
     *
     * @SeaBASS:
     * - File Search / Results / Download All
     * - File Search / Download Selection
     *
     * @param {DatasetDownloadRequest} request The request parameters.
     * @returns {string} A download URL to ZIP archive or binary ZIP stream (TBD).
     */
    downloadDatasets(request: DatasetDownloadRequest): string;

    /**
     * Plot a dataset.
     *
     * For 1 param given: histogram (freq. distr.).
     * For 2 params XY plot.
     * For 3 params color coded XY plot.
     *
     * @rest /api/dataset/plot?{DatasetPlotRequest}
     *
     * @SeaBASS:
     * - File Search / Results/ Table Row / Plot
     *
     * @param {DatasetPlotRequest} request
     * @returns {string} A download URL to plot PNG or binary PNG stream (TBD).
     */
    plotDataset(request: DatasetPlotRequest): string;

    /**
     * List files given a parent directory path.
     *
     * @rest /api/files/{dirPath}
     *
     * @SeaBASS:
     * - File Search / Results / Table Row / Archive
     * - File Search / Results / Table Row / Documents
     *
     * @param {string} dirPath A parent directory path.
     * @returns {string[]} List of file or directory paths. Directory paths end with a "/".
     */
    listFiles(dirPath: string): string[];
}
