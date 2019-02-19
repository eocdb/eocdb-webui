import { newAdvancedSearchState, SELECTED_BOUNDS_DEFAULT } from "./advancedSearchState";


describe('advancedSearchState', () => {
    it('newAdvancedSearchState', () => {
        const expected = {
            selectedBBox: SELECTED_BOUNDS_DEFAULT,
            selectedWavelength: 'all',
            waterDepthMin: 0,
            waterDepthMax: 1000,
            selectedOptShallow: '',
            selectedProducts: [],
            productInputValue: '',
        };

        expect(newAdvancedSearchState()).toEqual(expected);
    });
});