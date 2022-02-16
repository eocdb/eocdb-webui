import * as React from "react";
import Select from "react-select";
import { Suggestion } from "./MultipleSelectTextField";
import { FormControl } from "@mui/material";


interface MultipleSelectTextFieldProps {
    items: Suggestion[];
    selectedItem: Suggestion;
    width: string;

    onChange: (selectedItem: Suggestion) => void;

    placeholder?: string;
    label?: string;
}


export default function MultipleSelectTextField(props: MultipleSelectTextFieldProps) {
    const onChange = (value: Suggestion) => {
        props.onChange(value);
    };

    return (
        <FormControl sx={{'marginRight': props.width}}>
            <Select
                value={props.selectedItem}
                options={props.items}
                onChange={onChange}
                placeholder={props.placeholder}
                sx={{'marginRight': props.width}}
            />
        </FormControl>
    );
}

