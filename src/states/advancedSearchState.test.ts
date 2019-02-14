import { newAdvancedSearchState, SELECTED_BOUNDS_DEFAULT } from "./advancedSearchState";


describe('advancedSearchState', () => {
    it('newAdvancedSearchState', () => {
        const expected = {
            selectedBounds: SELECTED_BOUNDS_DEFAULT,
            selectedWavelength: 'all',
            waterDepthMin: 0,
            waterDepthMax: 1000,
            selectedOptShallow: '',
        };

        expect(newAdvancedSearchState()).toEqual(expected);
    });
});