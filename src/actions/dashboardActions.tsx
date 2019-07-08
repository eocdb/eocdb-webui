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

export const OPEN_CHANGE_USER_LOGIN_DIALOG = 'OPEN_CHANGE_USER_LOGIN_DIALOG';
export type OPEN_CHANGE_USER_LOGIN_DIALOG = typeof OPEN_CHANGE_USER_LOGIN_DIALOG;

export interface OpenChangeUserLoginDialog {
    type: OPEN_CHANGE_USER_LOGIN_DIALOG;
}

export function openChangeUserLoginDialog(): OpenChangeUserLoginDialog {
    return {type: OPEN_CHANGE_USER_LOGIN_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLOSE_CHANGE_USER_LOGIN_DIALOG = 'CLOSE_CHANGE_USER_LOGIN_DIALOG';
export type CLOSE_CHANGE_USER_LOGIN_DIALOG = typeof CLOSE_CHANGE_USER_LOGIN_DIALOG;

export interface CloseChangeUserLoginDialog {
    type: CLOSE_CHANGE_USER_LOGIN_DIALOG;
}

export function closeChangeUserLoginDialog(): CloseChangeUserLoginDialog {
    return {type: CLOSE_CHANGE_USER_LOGIN_DIALOG};
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const OPEN_USER_REGISTRATION_DIALOG = 'OPEN_USER_REGISTRATION_DIALOG';
export type OPEN_USER_REGISTRATION_DIALOG = typeof OPEN_USER_REGISTRATION_DIALOG;


export interface OpenUserRegistrationDialog {
    type: OPEN_USER_REGISTRATION_DIALOG;
}

export function openUserRegistrationDialog(): OpenUserRegistrationDialog {
    return {
        type: OPEN_USER_REGISTRATION_DIALOG
    }
}

export const CLOSE_USER_REGISTRATION_DIALOG = 'CLOSE_USER_REGISTRATION_DIALOG';
export type CLOSE_USER_REGISTRATION_DIALOG = typeof CLOSE_USER_REGISTRATION_DIALOG;


export interface CloseUserRegistrationDialog {
    type: CLOSE_USER_REGISTRATION_DIALOG;
}

export function closeUserRegistrationDialog(): CloseUserRegistrationDialog {
    return {
        type: CLOSE_USER_REGISTRATION_DIALOG
    }
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

export const OPEN_PRODUCTGROUPSHELP_DIALOG = 'OPEN_PRODUCTGROUPSHELP_DIALOG';
export type OPEN_PRODUCTGROUPSHELP_DIALOG = typeof OPEN_PRODUCTGROUPSHELP_DIALOG;

export interface OpenProductGroupsHelpDialog {
    type: OPEN_PRODUCTGROUPSHELP_DIALOG;
}

export function openProductGroupsHelpDialog(): OpenProductGroupsHelpDialog {
    return {type: OPEN_PRODUCTGROUPSHELP_DIALOG};
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const CLOSE_PRODUCTGROUPSHELP_DIALOG = 'CLOSE_PRODUCTGROUPSHELP_DIALOG';
export type CLOSE_PRODUCTGROUPSHELP_DIALOG = typeof CLOSE_PRODUCTGROUPSHELP_DIALOG;

export interface CloseProductGroupsHelpDialog {
    type: CLOSE_PRODUCTGROUPSHELP_DIALOG;
}

export function closeProductGroupsHelpDialog(): CloseProductGroupsHelpDialog {
    return {type: CLOSE_PRODUCTGROUPSHELP_DIALOG};
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
    | OpenProductGroupsHelpDialog
    | CloseProductGroupsHelpDialog
    | OpenHelpMetaInfoDialog
    | CloseHelpMetaInfoDialog
    | OpenUserRegistrationDialog
    | CloseUserRegistrationDialog
    | OpenChangeUserLoginDialog
    | CloseChangeUserLoginDialog;