import { BBoxValue } from "../components/search/BBoxInput";
import { SliderRange } from "../types/advancedSearchDialog";


export interface AdvancedSearchState {
    selectedBBox: BBoxValue;
    selectedWavelength: string;
    waterDepth: SliderRange;
    selectedOptShallow: string;
    selectedProducts: string[];
    productInputValue: string;
}

export const SELECTED_BOUNDS_DEFAULT: BBoxValue = ['', '', '', ''];

export function newAdvancedSearchState(): AdvancedSearchState  {
    return {
        selectedBBox: SELECTED_BOUNDS_DEFAULT,
        selectedWavelength: 'all',
        waterDepth: [0, 1000],
        selectedOptShallow: '',
        selectedProducts: [],
        productInputValue: '',
    };
}
