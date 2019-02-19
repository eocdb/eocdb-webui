//import { WavelengthsMode } from "../api/findDatasets";
import { BBoxValue } from "../components/search/BBoxInput";
import { SliderRange } from "../components/search/AdvancedSearchDialog";

export interface AdvancedSearchState {
    selectedBBox: BBoxValue;
    selectedWavelength: string;
    waterDepth: SliderRange;
    selectedOptShallow: string;
    selectedProducts: string[];
    productInputValue: string;
}

export const SELECTED_BOUNDS_DEFAULT: BBoxValue = [undefined, undefined, undefined, undefined];

export function newAdvancedSearchState(): AdvancedSearchState  {
    return {
        selectedBBox: SELECTED_BOUNDS_DEFAULT,
        selectedWavelength: 'all',
        waterDepth: [undefined, undefined],
        selectedOptShallow: '',
        selectedProducts: [],
        productInputValue: '',
    };
}
