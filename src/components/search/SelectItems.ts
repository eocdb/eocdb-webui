import { Suggestion } from "./MultipleSelectTextField";

export interface SelectItem{
    key: string,
    label: string,
}

export const wavelengthItems: Suggestion[] = [
    {label: 'All', value: 'all'},
    {label: 'Multispectral', value: 'multispectral'},
    {label: 'Hyperspectral', value: 'hyperspectral'},
];

