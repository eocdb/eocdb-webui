import { SearchHistoryItem } from "../types/dataset";

export interface DashboardState {
    currentDrawer: string;
    loginDialogOpen: boolean;
    configDialogOpen: boolean,
    advancedSearchDialogOpen: boolean;
    helpDialogOpen: boolean;
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
        helpDialogOpen: false,
        helpMetaInfoDialogOpen: false,
        helpMetaInfoKey: '',
        searchHistory: [],
    }
}
