import { SearchHistoryItem } from "../types/dataset";

export interface DashboardState {
    currentDrawer: string;
    loginDialogOpen: boolean;
    configDialogOpen: boolean,
    advancedSearchDialogOpen: boolean;
    productGroupsOpen: boolean;

    searchHistory: SearchHistoryItem[];
}

export function newDashboardState() {
    return {
        currentDrawer: 'Search',
        loginDialogOpen: false,
        configDialogOpen: false,
        advancedSearchDialogOpen: false,
        productGroupsOpen: false,
        searchHistory: [],
    }
}
