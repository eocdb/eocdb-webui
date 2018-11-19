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

export function openUserDialog(): OpenUserDialog {
    return {type: OPEN_USER_DIALOG, dlgUserOpen: true};
}


export const CLOSE_USER_DIALOG = 'CLOSE_USER_DIALOG';
export type CLOSE_USER_DIALOG = typeof CLOSE_USER_DIALOG;

export interface CloseUserDialog {
    type: CLOSE_USER_DIALOG;
    dlgUserOpen: boolean;
}

export function closeUserDialog(): CloseUserDialog {
    return {type: CLOSE_USER_DIALOG, dlgUserOpen: false};
}



export const OPEN_CONFIG_DIALOG = 'OPEN_CONFIG_DIALOG';
export type OPEN_CONFIG_DIALOG = typeof OPEN_CONFIG_DIALOG;

export interface OpenConfigDialog {
    type: OPEN_CONFIG_DIALOG;
    dlgConfigOpen: boolean;
}

export function openConfigDialog(): OpenConfigDialog {
    return {type: OPEN_CONFIG_DIALOG, dlgConfigOpen: true};
}


export const CLOSE_CONFIG_DIALOG = 'CLOSE_CONFIG_DIALOG';
export type CLOSE_CONFIG_DIALOG = typeof CLOSE_CONFIG_DIALOG;

export interface CloseConfigDialog {
    type: CLOSE_CONFIG_DIALOG;
    dlgConfigOpen: boolean;
}

export function closeConfigDialog(): OpenConfigDialog {
    return {type: OPEN_CONFIG_DIALOG, dlgConfigOpen: false};
}


export type DashboardAction = ChangeDrawer | OpenUserDialog | CloseUserDialog | OpenConfigDialog | CloseConfigDialog;