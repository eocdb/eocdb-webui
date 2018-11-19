import { callJsonApi } from './callApi';
import { DatasetRef } from '../types/dataset';

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
    offset?: number;
    count?: number;
}

type QueryComponent = [string, string];

export function searchDatasets(apiServerUrl: string, datasetQuery: DatasetQuery): Promise<DatasetRef[]> {
    const queryComponents: QueryComponent[] = [];
    collectSearchExprComponent(datasetQuery, queryComponents);
    collectTimeComponent(datasetQuery, queryComponents);
    collectRegionComponent(datasetQuery, queryComponents);
    collectProductComponents(datasetQuery, queryComponents);
    collectMeasurementTypeComponent(datasetQuery, queryComponents);
    collectWavelengthsTypeComponent(datasetQuery, queryComponents);
    collectOffsetCountComponents(datasetQuery, queryComponents);
    return callJsonApi<DatasetRef[]>(apiServerUrl + '/datasets', queryComponents);
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
    if (queryParameters.startDate && queryParameters.endDate) {
        queryComponents.push(['time', `${queryParameters.startDate},${queryParameters.endDate}`]);
    } else if (queryParameters.startDate) {
        queryComponents.push(['time', `${queryParameters.startDate},`]);
    } else if (queryParameters.endDate) {
        queryComponents.push(['time', `,${queryParameters.endDate}`]);
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

