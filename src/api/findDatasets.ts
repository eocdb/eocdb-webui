import { callJsonApi } from './callApi';
import { QueryResult } from '../types/dataset';

export type ProductMode = 'contains' | 'same_cruise' | 'dont_apply';
export type MeasurementType = 'all';
export type WavelengthsMode = 'all' | 'multispectral' | 'hyperspectral';

export interface DatasetQuery {
    searchExpr?: string;
    startDate?: string;
    endDate?: string;
    region?: string;
    productMode?: ProductMode;
    productNames?: string[];
    productGroupNames?: string[];
    measurementType?: MeasurementType;
    wavelengthsMode?: WavelengthsMode;
    datasetIds?: string[];
    offset?: number;
    count?: number;
    geojson?: boolean;
}

type QueryComponent = [string, string];


/**
 *
 * @param apiServerUrl: URL of the OCDB API
 * @param datasetQuery: query parameters to pass to the search dataset get request
 */
export function findDatasets(apiServerUrl: string, datasetQuery: DatasetQuery): Promise<QueryResult> {

    const queryComponents = collectComponents(datasetQuery);

    return callJsonApi<QueryResult>(apiServerUrl + '/datasets', queryComponents);
}


/**
 * Generates a URL query string from a DatasetQuery which contains the 'value' state of the search form.
 * @param datasetQuery
 */
export function collectComponents(datasetQuery: DatasetQuery) {

    const queryComponents: QueryComponent[] = [];
    collectSearchExprComponent(datasetQuery, queryComponents);
    collectTimeComponent(datasetQuery, queryComponents);
    collectRegionComponent(datasetQuery, queryComponents);
    collectProductComponents(datasetQuery, queryComponents);
    collectMeasurementTypeComponent(datasetQuery, queryComponents);
    collectWavelengthsTypeComponent(datasetQuery, queryComponents);
    collectOffsetCountComponents(datasetQuery, queryComponents);
    collectGeoJsonComponent(datasetQuery, queryComponents);
    collectDatasetIds(datasetQuery, queryComponents);
    return queryComponents;
}


function collectDatasetIds(queryParameters: DatasetQuery, queryComponents: QueryComponent[]) {
    if (queryParameters.datasetIds) {
        queryComponents.push(['id_list', JSON.stringify(queryParameters.datasetIds)]);
    }
}


function collectGeoJsonComponent(queryParameters: DatasetQuery, queryComponents: QueryComponent[]) {
    if (queryParameters.geojson) {
        queryComponents.push(['geojson', `${queryParameters.geojson}`]);
    }
}


function collectSearchExprComponent(queryParameters: DatasetQuery, queryComponents: QueryComponent[]) {
    if (queryParameters.searchExpr) {
        queryComponents.push(['expr', queryParameters.searchExpr]);
    }
}

function collectRegionComponent(queryParameters: DatasetQuery, queryComponents: QueryComponent[]) {
    if (queryParameters.region) {
        queryComponents.push(['region', queryParameters.region]);
    }
}

function collectTimeComponent(queryParameters: DatasetQuery, queryComponents: QueryComponent[]) {
    if (queryParameters.startDate) {
        queryComponents.push(['start_time', `${queryParameters.startDate}`]);
    }
    if (queryParameters.endDate) {
        queryComponents.push(['end_time', `${queryParameters.endDate}`]);
    }
}

function collectMeasurementTypeComponent(queryParameters: DatasetQuery, queryComponents: QueryComponent[]) {
    if (queryParameters.measurementType) {
        queryComponents.push(['mtype', queryParameters.measurementType]);
    }
}

function collectWavelengthsTypeComponent(queryParameters: DatasetQuery, queryComponents: QueryComponent[]) {
    if (queryParameters.wavelengthsMode) {
        queryComponents.push(['wlmode', queryParameters.wavelengthsMode]);
    }
}

function collectProductComponents(queryParameters: DatasetQuery, queryComponents: QueryComponent[]) {
    if (queryParameters.productNames) {
        for (const productName of queryParameters.productNames) {
            queryComponents.push(['pname', productName]);
        }
    }
    if (queryParameters.productGroupNames) {
        for (const productName of queryParameters.productGroupNames) {
            queryComponents.push(['pgroup', productName]);
        }
    }
    if (queryParameters.productMode && (queryParameters.productNames || queryParameters.productGroupNames)) {
        queryComponents.push(['pmode', queryParameters.productMode]);
    }
}

function collectOffsetCountComponents(queryParameters: DatasetQuery, queryComponents: QueryComponent[]) {
    if (typeof queryParameters.offset === 'number' && Number.isSafeInteger(queryParameters.offset)) {
        queryComponents.push(['offset', '' + queryParameters.offset]);
    }
    if (typeof queryParameters.count === 'number' && Number.isSafeInteger(queryParameters.count)) {
        queryComponents.push(['count', '' + queryParameters.count]);
    }
}

