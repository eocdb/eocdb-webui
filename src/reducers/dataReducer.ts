import { newDataState, DataState } from "../states/dataState";
import { UpdateInfo, UPDATE_STORE_INFO } from "../actions/configActions";

const initialState = newDataState();

export function dataReducer(state: DataState, action: UpdateInfo): DataState {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case UPDATE_STORE_INFO: {
            return {...state, info: action.info};
        }
    }
    return state;
}
