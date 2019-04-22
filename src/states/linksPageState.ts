export interface LinksPageState {
    content: string;
    editContentDialogOpen: boolean;
}

export function newLinksPageState() {
    return {
        content: '',
        editContentDialogOpen: false,
    }
}
