import { SearchMapState, newSearchMapState } from './searchMapState';

export interface AppState {
    searchMapState: SearchMapState;
}

export function newAppState(): AppState {
    return {
        searchMapState: newSearchMapState(),
    };
}
