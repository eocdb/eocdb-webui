export const CHANGE_DRAWER = 'CHANGE_DRAWER';
export type CHANGE_DRAWER = typeof CHANGE_DRAWER;

export interface ChangeDrawer {
    type: CHANGE_DRAWER;
    currentDrawer: string;
}

export function changeDrawer(currentDrawer: string): ChangeDrawer {
    return {type: CHANGE_DRAWER, currentDrawer};
}


export const OPEN_USER_DIALOG = 'OPEN_USER_DIALOG';
export type OPEN_USER_DIALOG = typeof OPEN_USER_DIALOG;

export interface OpenUserDialog {
    type: OPEN_USER_DIALOG;
    dlgUserOpen: boolean;
}

export function openUserDialog(dlgUserOpen: boolean): OpenUserDialog {
    return {type: OPEN_USER_DIALOG, dlgUserOpen};
}


export const OPEN_CONFIG_DIALOG = 'OPEN_CONFIG_DIALOG';
export type OPEN_CONFIG_DIALOG = typeof OPEN_CONFIG_DIALOG;

export interface OpenConfigDialog {
    type: OPEN_CONFIG_DIALOG;
    dlgConfigOpen: boolean;
}

export function openConfigDialog(dlgConfigOpen: boolean): OpenConfigDialog {
    return {type: OPEN_CONFIG_DIALOG, dlgConfigOpen};
}


export type DashboardAction = ChangeDrawer | OpenUserDialog | OpenConfigDialog;