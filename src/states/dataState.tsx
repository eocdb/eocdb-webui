import { StoreInfo } from "../types/dataset";

export interface DataState {
    info: StoreInfo;
}

export function newDataState() {
    return {
        info: {
            products: [],
            productGroups: [],
        }
    };
}