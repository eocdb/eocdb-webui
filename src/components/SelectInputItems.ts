export interface ISelectInput {
    /** Title. */
    label: string;
    value: string;
}


export const DataTypeItems: ISelectInput[] = [
    {label: "above_water", value: "above_water"},
    {label: "brdf", value: "brdf"},
    {label: "cast", value: "cast"},
    {label: "diver", value: "diver"},
    {label: "drifter", value: "drifter"},
    {label: "flow_thru", value: "flow_thru"},
    {label: "lidar", value: "lidar"},
    {label: "mooring", value: "mooring"},
    {label: "pigment", value: "pigment"},
    {label: "scan", value: "scan"},
    {label: "sunphoto", value: "sunphoto"},
];


export const WaveLengthItems: ISelectInput[] = [
    {label: 'All', value: 'All'},
    {label: "Multispectral", value: "Multispectral"},
    {label: "Hyperspectral", value: "Hyperspectral"},
];


export const ShallowItems: ISelectInput[] = [
    {label: 'Yes', value: 'Yes'},
    {label: "No", value: "No"},
    {label: "Exclusively", value: "Exclusively"},
];


export const ProductsItems: ISelectInput[] = [
    {label: "Find files containing any of the selected products", value: "One"},
    {label: 'Find files where all the specific products entered below were measured in the same cruise', value: 'Two'},
    {label: "Don't filter based on products", value: "Three"},
];


export const ProductGroupItems: ISelectInput[] = [
    {label: "AOP", value: "AOP"},
    {label: "PAR", value: "PAR"},
    {label: "Kd", value: "Kd"},
    {label: "a", value: "a"},
    {label: "b", value: "b"},
    {label: "bb", value: "bb"},
    {label: "c", value: "c"},
    {label: "DC", value: "DC"},
    {label: "PC", value: "PC"},
    {label: "SPM", value: "SPM"},
    {label: "AOT", value: "AOT"},
    {label: "nutrients", value: "nutrients"},
    {label: "CTD", value: "CTD"},
    {label: "fluoresence", value: "fluoresence"},
    {label: "productivity", value: "productivity"},
    {label: "Chl", value: "Chl"},
    {label: "HPLC", value: "HPLC"},
];




