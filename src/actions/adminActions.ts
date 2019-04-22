
export const OPEN_LINKS_CONTENT_DIALOG = 'OPEN_LINKS_CONTENT_DIALOG';
export type OPEN_LINKS_CONTENT_DIALOG = typeof OPEN_LINKS_CONTENT_DIALOG;

export interface OpenLinksContentDialog {
    type: OPEN_LINKS_CONTENT_DIALOG;
}

export function openLinksContentDialog(): OpenLinksContentDialog {
    return {type: OPEN_LINKS_CONTENT_DIALOG};
}

export const CLOSE_LINKS_CONTENT_DIALOG = 'CLOSE_LINKS_CONTENT_DIALOG ';
export type CLOSE_LINKS_CONTENT_DIALOG  = typeof CLOSE_LINKS_CONTENT_DIALOG ;

export interface CloseLinksContentDialog {
    type: CLOSE_LINKS_CONTENT_DIALOG ;
}

export function closeLinksContentDialog(): CloseLinksContentDialog  {
    return {type: CLOSE_LINKS_CONTENT_DIALOG };
}

export const UPDATE_LINKS_CONTENT = 'UPDATE_LINKS_CONTENT ';
export type UPDATE_LINKS_CONTENT  = typeof UPDATE_LINKS_CONTENT ;

export interface UpdateLinksContent {
    type: UPDATE_LINKS_CONTENT;
    linksContent: string;
}

export function updateLinksContent(linksContent: string): UpdateLinksContent  {
    return {type: UPDATE_LINKS_CONTENT, linksContent};
}

export type  AdminAction = OpenLinksContentDialog | CloseLinksContentDialog | UpdateLinksContent;
