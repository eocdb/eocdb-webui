import {
    UPDATE_BBOX,
    UpdateBBox,
    UPDATE_WAVELENGTH,
    UPDATE_WATERDEPTH,
    UpdateWavelength,
    UpdateWaterDepth,
    UPDATE_OPTSHALLOW,
    UpdateOptShallow
} from "../actions/advancedSearchActions";
import { SELECTED_BOUNDS_DEFAULT } from "../states/advancedSearchState";
import { advancedSearchReducer } from "./advancedSearchReducer";



describe('advancedSearchReducer', () => {
    it('submissionReducer to update BBOX', () => {
        const action: UpdateBBox = {
            type: UPDATE_BBOX,
            selectedBounds: SELECTED_BOUNDS_DEFAULT,
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.selectedBounds).toEqual(SELECTED_BOUNDS_DEFAULT);
    });

    it('submissionReducer to update BBOX', () => {
        const action: UpdateBBox = {
            type: UPDATE_BBOX,
            selectedBounds: SELECTED_BOUNDS_DEFAULT,
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.selectedBounds).toEqual(SELECTED_BOUNDS_DEFAULT);
    });

    it('submissionReducer to UpdateSelectedWavelength', () => {
        const action: UpdateWavelength = {
            type: UPDATE_WAVELENGTH ,
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

    it('submissionReducer to UpdateSelectedOptShallow', () => {
        const action: UpdateOptShallow = {
            type: UPDATE_OPTSHALLOW ,
            selectedOptShallow: '',
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.selectedOptShallow).toEqual('');
    });
});

