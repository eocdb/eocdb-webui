import { Suggestion } from "./MultipleSelectTextField";

export interface SelectItem{
    key: string,
    label: string,
}

export const wavelengthItems: Suggestion[] = [
    {label: 'all', value: 'All'},
    {label: 'multispectral', value: 'Multispectral'},
    {label: 'hyperspectral', value: 'Hyperspectral'},
];

