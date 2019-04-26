import { SearchHistoryItem } from "../types/dataset";

export interface DashboardState {
    currentDrawer: string;
    loginDialogOpen: boolean;
    configDialogOpen: boolean,
    advancedSearchDialogOpen: boolean;
    saveSearchDialogOpen: boolean;

    helpDialogOpen: boolean;
    productGroupsHelpDialogOpen: boolean;

    helpMetaInfoDialogOpen: boolean;
    helpMetaInfoKey: string;

    searchHistory: SearchHistoryItem[];
}

export function newDashboardState() {
    return {
        currentDrawer: 'Search',
        loginDialogOpen: false,
        configDialogOpen: false,
        advancedSearchDialogOpen: false,
        saveSearchDialogOpen: false,
        helpDialogOpen: false,
        productGroupsHelpDialogOpen: false,
        helpMetaInfoDialogOpen: false,
        helpMetaInfoKey: '',
        searchHistory: [],
    }
}
