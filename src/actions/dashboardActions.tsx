//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CHANGE_DRAWER = 'CHANGE_DRAWER';
export type CHANGE_DRAWER = typeof CHANGE_DRAWER;

export interface ChangeDrawer {
    type: CHANGE_DRAWER;
    currentDrawer: string;
}

export function changeDrawer(currentDrawer: string): ChangeDrawer {
    return {type: CHANGE_DRAWER, currentDrawer};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_LOGIN_DIALOG = 'OPEN_LOGIN_DIALOG';
export type OPEN_LOGIN_DIALOG = typeof OPEN_LOGIN_DIALOG;

export interface OpenLoginDialog {
    type: OPEN_LOGIN_DIALOG;
}

export function openLoginDialog(): OpenLoginDialog {
    return {type: OPEN_LOGIN_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLOSE_LOGIN_DIALOG = 'CLOSE_LOGIN_DIALOG';
export type CLOSE_LOGIN_DIALOG = typeof CLOSE_LOGIN_DIALOG;

export interface CloseUserDialog {
    type: CLOSE_LOGIN_DIALOG;
}

export function closeLoginDialog(): CloseUserDialog {
    return {type: CLOSE_LOGIN_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function openRegistrationDialog() {
    // TODO: implement me
    throw Error('Not implemented.');
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_CONFIG_DIALOG = 'OPEN_CONFIG_DIALOG';
export type OPEN_CONFIG_DIALOG = typeof OPEN_CONFIG_DIALOG;

export interface OpenConfigDialog {
    type: OPEN_CONFIG_DIALOG;
    dlgConfigOpen: boolean;
}

export function openConfigDialog(): OpenConfigDialog {
    return {type: OPEN_CONFIG_DIALOG, dlgConfigOpen: true};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLOSE_CONFIG_DIALOG = 'CLOSE_CONFIG_DIALOG';
export type CLOSE_CONFIG_DIALOG = typeof CLOSE_CONFIG_DIALOG;

export interface CloseConfigDialog {
    type: CLOSE_CONFIG_DIALOG;
    dlgConfigOpen: boolean;
}

export function closeConfigDialog(): OpenConfigDialog {
    return {type: OPEN_CONFIG_DIALOG, dlgConfigOpen: false};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type DashboardAction = ChangeDrawer | OpenLoginDialog | CloseUserDialog | OpenConfigDialog | CloseConfigDialog;