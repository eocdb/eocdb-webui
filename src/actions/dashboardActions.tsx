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

export const OPEN_SAVE_SEARCH_DIALOG = 'OPEN_SAVE_SEARCH_DIALOG';
export type OPEN_SAVE_SEARCH_DIALOG = typeof OPEN_SAVE_SEARCH_DIALOG;

export interface OpenSaveSearchDialog {
    type: OPEN_SAVE_SEARCH_DIALOG;
}

export function openSaveSearchDialog(): OpenSaveSearchDialog {
    return {type: OPEN_SAVE_SEARCH_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLOSE_SAVE_SEARCH_DIALOG = 'CLOSE_SAVE_SEARCH_DIALOG';
export type CLOSE_SAVE_SEARCH_DIALOG = typeof CLOSE_SAVE_SEARCH_DIALOG;

export interface CloseSaveSearchDialog {
    type: CLOSE_SAVE_SEARCH_DIALOG;
}

export function closeSaveSearchDialog(): CloseSaveSearchDialog {
    return {type: CLOSE_SAVE_SEARCH_DIALOG};
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_HELP_DIALOG = 'OPEN_HELP_DIALOG';
export type OPEN_HELP_DIALOG = typeof OPEN_HELP_DIALOG;

export interface OpenHelpDialog {
    type: OPEN_HELP_DIALOG;
}

export function openHelpDialog(): OpenHelpDialog {
    return {type: OPEN_HELP_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLOSE_HELP_DIALOG = 'CLOSE_HELP_DIALOG';
export type CLOSE_HELP_DIALOG = typeof CLOSE_HELP_DIALOG;

export interface CloseHelpDialog {
    type: CLOSE_HELP_DIALOG;
}

export function closeHelpDialog(): CloseHelpDialog {
    return {type: CLOSE_HELP_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_HELP_METAINFO_DIALOG = 'OPEN_HELP_METAINFO_DIALOG';
export type OPEN_HELP_METAINFO_DIALOG = typeof OPEN_HELP_METAINFO_DIALOG;

export interface OpenHelpMetaInfoDialog {
    type: OPEN_HELP_METAINFO_DIALOG;
    helpMetaInfoKey: string;
}

export function openHelpMetaInfoDialog(helpMetaInfoKey: string): OpenHelpMetaInfoDialog {
    return {type: OPEN_HELP_METAINFO_DIALOG, helpMetaInfoKey};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLOSE_HELP_METAINFO_DIALOG = 'CLOSE_HELP_METAINFO_DIALOG';
export type CLOSE_HELP_METAINFO_DIALOG = typeof CLOSE_HELP_METAINFO_DIALOG;

export interface CloseHelpMetaInfoDialog {
    type: CLOSE_HELP_METAINFO_DIALOG;
}

export function closeHelpMetaInfoDialog(): CloseHelpMetaInfoDialog {
    return {type: CLOSE_HELP_METAINFO_DIALOG};
}


export type DashboardAction = ChangeDrawer
    | OpenLoginDialog
    | CloseUserDialog
    | OpenConfigDialog
    | CloseConfigDialog
    | OpenAdvancedSearchDialog
    | CloseAdvancedSearchDialog
    | OpenSaveSearchDialog
    | CloseSaveSearchDialog
    | OpenHelpDialog
    | CloseHelpDialog
    | OpenHelpMetaInfoDialog
    | CloseHelpMetaInfoDialog;