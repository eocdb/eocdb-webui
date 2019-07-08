import { MatchupState, newMatchupState } from "../states/matchupState";
import {
    CLOSE_TERMS_DIALOG,
    MatchupActions,
    OPEN_TERMS_DIALOG,
    UPDATE_SELECTED_ROW_DATA
} from "../actions/matchupActions";

const initialState = newMatchupState();

export function matchupReducer(state: MatchupState, action: MatchupActions): MatchupState {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case UPDATE_SELECTED_ROW_DATA: {
            return {...state, selectedRowData: action.selectedRowData};
        }
        case OPEN_TERMS_DIALOG: {
            return {...state, termsDialogOpen: true};
        }
        case CLOSE_TERMS_DIALOG: {
            return {...state, termsDialogOpen: false};
        }
    }
    return state;
}
