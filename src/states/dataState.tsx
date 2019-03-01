import { StoreInfo } from "../model";

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