import {LinksPageState, newLinksPageState} from "../states/linksPageState";
import {
    AdminAction,
    CLOSE_LINKS_CONTENT_DIALOG,
    OPEN_LINKS_CONTENT_DIALOG,
    UPDATE_LINKS_CONTENT
} from "../actions/adminActions";


const initialState = newLinksPageState();

export function adminReducer(state: LinksPageState = initialState, action: AdminAction) {
    switch (action.type) {
        case OPEN_LINKS_CONTENT_DIALOG: {
            return {...state, editContentDialogOpen: true}
        }
        case CLOSE_LINKS_CONTENT_DIALOG: {
            return {...state, editContentDialogOpen: false}
        }
        case UPDATE_LINKS_CONTENT:{
            return {...state, content: action.linksContent}
        }
        default:
            return state;
    }
}