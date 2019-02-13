import {
    BBOX_CHANGE,
    BboxChange,
    UPDATE_SELECTED_WAVELENGTH, UPDATE_WATERDEPTH,
    UpdateSelectedWavelength, UpdateWaterDepth
} from "../actions/advancedSearchActions";
import { SELECTED_BOUNDS_DEFAULT } from "../states/advancedSearchState";
import { advancedSearchReducer } from "./advancedSearchReducer";



describe('advancedSearchReducer', () => {
    it('submissionReducer to update BBOX', () => {
        const action: BboxChange = {
            type: BBOX_CHANGE,
            selectedBounds: SELECTED_BOUNDS_DEFAULT,
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.selectedBounds).toEqual(SELECTED_BOUNDS_DEFAULT);
    });

    it('submissionReducer to update BBOX', () => {
        const action: BboxChange = {
            type: BBOX_CHANGE,
            selectedBounds: SELECTED_BOUNDS_DEFAULT,
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.selectedBounds).toEqual(SELECTED_BOUNDS_DEFAULT);
    });

    it('submissionReducer to UpdateSelectedWavelength', () => {
        const action: UpdateSelectedWavelength = {
            type: UPDATE_SELECTED_WAVELENGTH ,
            selectedWavelength: '',
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.selectedBounds).toEqual('all');
    });

    it('submissionReducer to UpdateWaterDepth', () => {
        const action: UpdateWaterDepth = {
            type: UPDATE_WATERDEPTH,
            waterDepthMin: 0,
            waterDepthMax: 1000,
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.waterDepthMin).toEqual(0);
        expect(result.waterDepthMax).toEqual(1000);
    });


});

