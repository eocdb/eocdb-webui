export interface AdminState {
    linksContentDialogOpen: boolean;
}

export function newAdminState() {
    return {linksContentDialogOpen: false};
}