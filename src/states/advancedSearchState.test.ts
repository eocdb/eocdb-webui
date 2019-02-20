import { newAdvancedSearchState, SELECTED_BOUNDS_DEFAULT } from "./advancedSearchState";


describe('advancedSearchState', () => {
    it('newAdvancedSearchState', () => {
        const expected = {
            selectedBBox: SELECTED_BOUNDS_DEFAULT,
            selectedWavelength: 'all',
            waterDepth: [undefined, undefined],
            selectedOptShallow: '',
            selectedProducts: [],
            productInputValue: '',
        };

        expect(newAdvancedSearchState()).toEqual(expected);
    });
});