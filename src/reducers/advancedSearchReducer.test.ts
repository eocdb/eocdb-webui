import {
    UPDATE_WAVELENGTH,
    UPDATE_WATERDEPTH,
    UpdateWavelength,
    UpdateWaterDepth,
    UPDATE_OPTSHALLOW,
    UpdateOptShallow,
    UpdateProducts,
    UPDATE_PRODUCTS,
    UpdateProductValue,
    UPDATE_PRODUCT_VALUE,
    UpdateBBox,
    UPDATE_BBOX
} from "../actions/advancedSearchActions";
import { advancedSearchReducer } from "./advancedSearchReducer";
import { SELECTED_BOUNDS_DEFAULT } from "../states/advancedSearchState";



describe('advancedSearchReducer', () => {

    it('submissionReducer to update BBOX', () => {
        const action: UpdateBBox = {
            type: UPDATE_BBOX,
            selectedBBox: SELECTED_BOUNDS_DEFAULT,
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.selectedBBox).toEqual(SELECTED_BOUNDS_DEFAULT);
    });

    it('submissionReducer to update BBOX', () => {
        const action: UpdateBBox = {
            type: UPDATE_BBOX,
            selectedBBox: SELECTED_BOUNDS_DEFAULT,
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.selectedBBox).toEqual(SELECTED_BOUNDS_DEFAULT);
    });


    it('submissionReducer to UpdateSelectedWavelength', () => {
        const action: UpdateWavelength = {
            type: UPDATE_WAVELENGTH ,
            selectedWavelength: '',
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.selectedWavelength).toEqual('');
    });

    it('submissionReducer to UpdateWaterDepth', () => {
        const action: UpdateWaterDepth = {
            type: UPDATE_WATERDEPTH,
            waterDepth: [0, 1000],
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.waterDepth).toEqual([0, 1000]);
    });

    it('submissionReducer to UpdateSelectedOptShallow', () => {
        const action: UpdateOptShallow = {
            type: UPDATE_OPTSHALLOW ,
            selectedOptShallow: '',
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.selectedOptShallow).toEqual('');
    });

    it('submissionReducer to UpdateProducts', () => {
        const action: UpdateProducts = {
            type: UPDATE_PRODUCTS ,
            selectedProducts: [],
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.selectedProducts).toEqual([]);
    });

    it('submissionReducer to UpdateProductInputValue', () => {
        const action: UpdateProductValue = {
            type: UPDATE_PRODUCT_VALUE ,
            productInputValue: '',
        };

        const result = advancedSearchReducer(undefined, action);
        expect(result.productInputValue).toEqual('');
    });
});

