import * as React from "react";
import { SliderRange } from "../../types/advancedSearchDialog";
import { Slider, Box, Input } from "@mui/material";


interface MinMaxInputSliderProps {
    value: number | number[];
    onChange: (value: SliderRange) => void;

    label: string;

    disabled: boolean;
}


function valuetext(value: number) {
    return `${value}m`;
}


export default function MinMaxInputSlider(props: MinMaxInputSliderProps) {
    const {value} = props;

    const handleChange = (event: Event, newValue: number | number[]) => {
        newValue = newValue as number[];

        props.onChange(newValue as SliderRange);
    };

    const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let v = event.target.value === '' ? 0 : Number(event.target.value);
        v = Math.min(Math.max(v, 0), value[1]);
        props.onChange([v, value[1]]);
    };

    const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let v = event.target.value === '' ? 0 : Number(event.target.value);
        v = Math.min(Math.max(v, value[0]), 1000);
        props.onChange([value[0], v]);
    };

    const getNumberInputValue = (value?: number) => {
        if (value === null) {
            return '';
        }
        else {
            return value;
        }
    }

    return (
        <div>
            <Box sx={{ width: 300 }}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    max={1000}
                    disabled={props.disabled}
                />
                <Input
                    value={getNumberInputValue(value[0])}
                    size="small"
                    disabled={props.disabled}
                    onChange={handleMinInputChange}
                    inputProps={{
                        step: 10,
                        min: 0,
                        max: 1000,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
                <Input
                    value={getNumberInputValue(value[1])}
                    size="small"
                    disabled={props.disabled}
                    onChange={handleMaxInputChange}
                    inputProps={{
                        step: 10,
                        min: 0,
                        max: 1000,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </Box>
        </div>
        );
}

