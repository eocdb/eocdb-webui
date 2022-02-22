import * as React from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { FormControl, InputLabel, MenuItem, OutlinedInput, Theme, useTheme } from "@mui/material";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


export interface Suggestion {
    value: string;
    label: string;
}


function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

interface MultipleSelectTextFieldProps {
    suggestions: string[];
    selectedItems: string[];

    onChange: (selectedItems: string[]) => void;

    isMulti: boolean;
    closeMenuOnSelect: boolean;

    placeholder?: string;
    inputLabel?: string;
    inputLabelWidth?: number;

    className?: string;
}


export default function MultipleSelectTextField(props: MultipleSelectTextFieldProps) {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof props.selectedItems>) => {
        const {target: { value }, } = event;
        let newValue = typeof value === 'string' ? value.split(',') : value;
        props.onChange(newValue);
    };

    return (
        <FormControl sx={{ width: "100%" }}>
            <InputLabel id="multiple-select-label">{props.placeholder}</InputLabel>
            <Select
                labelId="multiple-select-label"
                id="multiple-seclect"
                multiple
                value={props.selectedItems}
                onChange={handleChange}
                input={<OutlinedInput label={props.placeholder} />}
                MenuProps={MenuProps}
            >
                {props.suggestions.map((suggestion) => (
                    <MenuItem
                        key={suggestion}
                        value={suggestion}
                        style={getStyles(suggestion, props.selectedItems, theme)}
                    >
                        {suggestion}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
