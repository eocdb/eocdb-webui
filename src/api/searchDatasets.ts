import { HTTPError } from './errors';

export type ProductMode = 'contains' | 'same_cruise' | 'dont_apply';
export type MeasurementType = 'all';
export type WavelengthsMode = 'all' | 'multispectral' | 'hyperspectral';

export interface DatasetQueryParameters {
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

export function searchDatasets(apiServerUrl: string, queryParameters: DatasetQueryParameters) {
    const queryComponents: QueryComponent[] = [];

    collectSearchExprComponent(queryParameters, queryComponents);
    collectTimeComponent(queryParameters, queryComponents);
    collectRegionComponent(queryParameters, queryComponents);
    collectProductComponents(queryParameters, queryComponents);
    collectMeasurementTypeComponent(queryParameters, queryComponents);
    collectWavelengthsTypeComponent(queryParameters, queryComponents);
    collectOffsetCountComponents(queryParameters, queryComponents);

    const searchDatasetEndpointUrl = apiServerUrl + '/datasets';
    let searchDatasetUrl = searchDatasetEndpointUrl;
    if (queryComponents.length > 0) {
        const queryString = queryComponents.map(kv => kv.map(encodeURIComponent).join('=')).join('&');
        searchDatasetUrl += '?' + queryString;
    }

    console.log(searchDatasetUrl);

    return fetch(searchDatasetUrl)
        .then(response => {
            if (!response.ok) {
                throw new HTTPError(response.status, response.statusText);
            }
            return response.json();
        })
        .catch(error => {
            if (error instanceof TypeError) {
                throw new Error(`Cannot reach ${searchDatasetEndpointUrl}`);
            }
        });
}


function collectSearchExprComponent(queryParameters: DatasetQueryParameters, queryComponents: QueryComponent[]) {
    if (queryParameters.searchExpr) {
        queryComponents.push(['expr', queryParameters.searchExpr]);
    }
}

function collectRegionComponent(queryParameters: DatasetQueryParameters, queryComponents: QueryComponent[]) {
    if (queryParameters.region) {
        queryComponents.push(['region', queryParameters.region]);
    }
}

function collectTimeComponent(queryParameters: DatasetQueryParameters, queryComponents: QueryComponent[]) {
    if (queryParameters.startDate && queryParameters.endDate) {
        queryComponents.push(['time', `${queryParameters.startDate},${queryParameters.endDate}`]);
    } else if (queryParameters.startDate) {
        queryComponents.push(['time', `${queryParameters.startDate},`]);
    } else if (queryParameters.endDate) {
        queryComponents.push(['time', `,${queryParameters.endDate}`]);
    }
}

function collectMeasurementTypeComponent(queryParameters: DatasetQueryParameters, queryComponents: QueryComponent[]) {
    if (queryParameters.measurementType) {
        queryComponents.push(['mtype', queryParameters.measurementType]);
    }
}

function collectWavelengthsTypeComponent(queryParameters: DatasetQueryParameters, queryComponents: QueryComponent[]) {
    if (queryParameters.wavelengthsMode) {
        queryComponents.push(['wlmode', queryParameters.wavelengthsMode]);
    }
}

function collectProductComponents(queryParameters: DatasetQueryParameters, queryComponents: QueryComponent[]) {
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

function collectOffsetCountComponents(queryParameters: DatasetQueryParameters, queryComponents: QueryComponent[]) {
    if (typeof queryParameters.offset === 'number' && Number.isSafeInteger(queryParameters.offset)) {
        queryComponents.push(['offset', '' + queryParameters.offset]);
    }
    if (typeof queryParameters.count === 'number' && Number.isSafeInteger(queryParameters.count)) {
        queryComponents.push(['count', '' + queryParameters.count]);
    }
}

