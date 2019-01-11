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
}

export function openConfigDialog(): OpenConfigDialog {
    return {type: OPEN_CONFIG_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLOSE_CONFIG_DIALOG = 'CLOSE_CONFIG_DIALOG';
export type CLOSE_CONFIG_DIALOG = typeof CLOSE_CONFIG_DIALOG;

export interface CloseConfigDialog {
    type: CLOSE_CONFIG_DIALOG;
}

export function closeConfigDialog(): CloseConfigDialog {
    return {type: CLOSE_CONFIG_DIALOG};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_ADVANCED_SEARCH_DIALOG = 'OPEN_ADVANCED_SEARCH_DIALOG';
export type OPEN_ADVANCED_SEARCH_DIALOG = typeof OPEN_ADVANCED_SEARCH_DIALOG;

export interface OpenAdvancedSearchDialog {
    type: OPEN_ADVANCED_SEARCH_DIALOG;
}

export function openAdvancedSearchDialog(): OpenAdvancedSearchDialog {
    return {type: OPEN_ADVANCED_SEARCH_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLOSE_ADVANCED_SEARCH_DIALOG = 'CLOSE_ADVANCED_SEARCH_DIALOG';
export type CLOSE_ADVANCED_SEARCH_DIALOG = typeof CLOSE_ADVANCED_SEARCH_DIALOG;

export interface CloseAdvancedSearchDialog {
    type: CLOSE_ADVANCED_SEARCH_DIALOG;
}

export function closeAdvancedSearchDialog(): CloseAdvancedSearchDialog {
    return {type: CLOSE_ADVANCED_SEARCH_DIALOG};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_PRODUCT_GROUPS = 'OPEN_PRODUCT_GROUPS';
export type OPEN_PRODUCT_GROUPS = typeof OPEN_PRODUCT_GROUPS;

export interface OpenProductGroups {
    type: OPEN_PRODUCT_GROUPS;
}

export function openProductGroups(): OpenProductGroups {
    return {type: OPEN_PRODUCT_GROUPS};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLOSE_PRODUCT_GROUPS = 'CLOSE_PRODUCT_GROUPS';
export type CLOSE_PRODUCT_GROUPS = typeof CLOSE_PRODUCT_GROUPS;

export interface CloseProductGroups {
    type: CLOSE_PRODUCT_GROUPS;
}

export function closeProductGroups(): CloseProductGroups {
    return {type: CLOSE_PRODUCT_GROUPS};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type DashboardAction = ChangeDrawer
    | OpenLoginDialog
    | CloseUserDialog
    | OpenConfigDialog
    | CloseConfigDialog
    | OpenAdvancedSearchDialog
    | CloseAdvancedSearchDialog
    | OpenProductGroups
    | CloseProductGroups;