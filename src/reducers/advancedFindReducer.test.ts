import {
    UPDATE_WAVELENGTH,
    UPDATE_WATERDEPTH,
    UpdateWavelength,
    UpdateWaterDepth,
    UPDATE_OPTSHALLOW,
    UpdateOptShallow,
    UpdateProducts,
    UPDATE_PRODUCTS,
    UpdateBBox,
    UPDATE_BBOX
} from "../actions/advancedFindActions";
import { advancedSearchReducer } from "./advancedSearchReducer";
import { SELECTED_BOUNDS_DEFAULT } from "../model/DatasetQuery";



describe('advancedSearchReducer', () => {

    it('submissionReducer to update BBOX', () => {
        const action: UpdateBBox = {
            type: UPDATE_BBOX,
            selectedBBox: SELECTED_BOUNDS_DEFAULT,
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.datasetQuery.selectedBBox).toEqual(SELECTED_BOUNDS_DEFAULT);
    });

    it('submissionReducer to update BBOX', () => {
        const action: UpdateBBox = {
            type: UPDATE_BBOX,
            selectedBBox: SELECTED_BOUNDS_DEFAULT,
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.datasetQuery.selectedBBox).toEqual(SELECTED_BOUNDS_DEFAULT);
    });


    it('submissionReducer to UpdateSelectedWavelength', () => {
        const action: UpdateWavelength = {
            type: UPDATE_WAVELENGTH ,
            selectedWavelength: '',
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.datasetQuery.wavelengthsMode).toEqual(null);
    });

    it('submissionReducer to UpdateWaterDepth', () => {
        const action: UpdateWaterDepth = {
            type: UPDATE_WATERDEPTH,
            waterDepth: [0, 1000],
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.datasetQuery.wdepth).toEqual([null, null]);
    });

    it('submissionReducer to UpdateSelectedOptShallow', () => {
        const action: UpdateOptShallow = {
            type: UPDATE_OPTSHALLOW ,
            selectedOptShallow: '',
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.datasetQuery.shallow).toEqual(null);
    });

    it('submissionReducer to UpdateProducts', () => {
        const action: UpdateProducts = {
            type: UPDATE_PRODUCTS ,
            selectedProducts: [],
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.datasetQuery.productNames).toEqual([]);
    });

});

