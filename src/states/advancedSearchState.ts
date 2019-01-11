import { AdvancedSearchItem } from "../types/advancedSearchDialog";

export interface AdvancedSearchState {
    left: number;
    bottom: number;
    right: number;
    top: number;
    filterLog: AdvancedSearchItem[];
}


export function newAdvancedSearchState() {
    return {
        left: 0,
        bottom: 0,
        right: 0,
        top: 0,
        filterLog: [],
    };
}
