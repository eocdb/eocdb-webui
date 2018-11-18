export interface DashboardState {
    currentDrawer: string;
}

export function newDashboardState() {
    return {
        currentDrawer: 'home',
    }
}