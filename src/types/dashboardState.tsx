export interface DashboardState {
    currentDrawer: string;
    dlgUserOpen: boolean;
    dlgConfigOpen: boolean,
}

export function newDashboardState() {
    return {
        currentDrawer: 'Search',
        dlgUserOpen: false,
        dlgConfigOpen: false,
    }
}
