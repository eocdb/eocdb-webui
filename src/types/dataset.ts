/**
 * Dataset reference.
 */
export interface DatasetRef {
    id: string;
    path: string;
}


export interface Info {
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

