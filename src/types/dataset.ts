/**
 * Dataset reference.
 */
import { ProductMode } from "../api/findDatasets";


export interface DatasetRef {
    id: string;
    path: string;
}


export interface DatasetQuery {
    expr?: string;
    mtype: string;
    time?: string[];
    region?: string;
    pmode?: ProductMode;
    pname?: string[];
    pgroup?: string[];
    shallow: string;
    wdepth: string;
    offset?: number;
    count?: number;
    geojson?: boolean;
}


export interface QueryResult {
    datasets: DatasetRef[];
    query: DatasetQuery;
    total_count: number;
    locations: Map<string, string>;
}


export interface StoreInfo {
    products: Product[];
    productGroups: ProductGroup[];
}

export interface Product {
    name: string;
    units: string;
    description: string;
}

export interface ProductGroup {
    name: string;
    description: string;
}

export interface SearchHistoryItem {
    key: string;
    query: string;
}


export type DatasetMetaData = Map<string, string>;


export interface Dataset {
    id: string;
    path: string;
    metadata: DatasetMetaData;
    records: number[][];
    longitudes: number[];
    latiudes: number[];
    attributes: string[];
    times: string[];
}


export interface SearchHistoryItem{
    name: string;
    searchPath: string;
}
