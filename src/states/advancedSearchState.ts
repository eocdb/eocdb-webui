export interface AdvancedSearchState {
    left: number;
    bottom: number;
    right: number;
    top: number;
    filterLog: Map<string, string>;
}


export function newAdvancedSearchState() {
    return {
        left: 0,
        bottom: 0,
        right: 0,
        top: 0,
        filterLog: new Map(),
    };
}
