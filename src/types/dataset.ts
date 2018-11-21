/**
 * Dataset reference.
 */
import { ProductMode } from "../api/searchDatasets";

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
}


export interface QueryResult {
    datasets: DatasetRef[];
    query: DatasetQuery;
    total_count: number;
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

