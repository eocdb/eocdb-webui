import { SearchMapState, newSearchMapState } from '../states/searchMapState';
import {
    CLOSE_MANUAL_BBOX_DIALOG,
    OPEN_MANUAL_BBOX_DIALOG,
    SearchMapAction,
    UPDATE_MANUAL_BBOX,
    UPDATE_MANUAL_BBOX_EAST,
    UPDATE_MANUAL_BBOX_NORTH,
    UPDATE_MANUAL_BBOX_SOUTH,
    UPDATE_MANUAL_BBOX_WEST,
    UPDATE_SELECTED_REGIONS
} from '../actions/searchMapActions';


const initialState = newSearchMapState();

export function searchMapReducer(state: SearchMapState, action: SearchMapAction) {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case UPDATE_SELECTED_REGIONS:
            return {
                ...state,
                selectedRegions: action.selectedRegions,
                selectedBounds: action.selectedBounds,
                drawBounds: action.drawBounds,
            };
        case UPDATE_MANUAL_BBOX:
            return {...state, selectedManualBounds: action.selectedBBox};
        case UPDATE_MANUAL_BBOX_SOUTH:
            return {...state, selectedBBoxSouth: action.selectedBBoxSouth};
        case UPDATE_MANUAL_BBOX_WEST:
            return {...state, selectedBBoxWest: action.selectedBBoxWest};
        case UPDATE_MANUAL_BBOX_NORTH:
            return {...state, selectedBBoxNorth: action.selectedBBoxNorth};
        case UPDATE_MANUAL_BBOX_EAST:
            return {...state, selectedBBoxEast: action.selectedBBoxEast};
        case CLOSE_MANUAL_BBOX_DIALOG:
            return {...state, manualBBoxInputOpen: false};
        case OPEN_MANUAL_BBOX_DIALOG:
            return {...state, manualBBoxInputOpen: true};
    }
    return state;
}
