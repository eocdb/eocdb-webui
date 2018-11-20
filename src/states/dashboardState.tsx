export interface DashboardState {
    currentDrawer: string;
    loginDialogOpen: boolean;
    configDialogOpen: boolean,
}

export function newDashboardState() {
    return {
        currentDrawer: 'Search',
        loginDialogOpen: false,
        configDialogOpen: false,
    }
}
