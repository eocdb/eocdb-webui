import { newDataState, DataState } from "../states/dataState";
import { UpdateInfo, GET_INFO } from "../actions/configActions";

const initialState = newDataState();

export function dataReducer(state: DataState, action: UpdateInfo): DataState {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case GET_INFO: {
            return {...state, info: action.info};
        }
    }
    return state;
}
