import * as React from "react";
import { FormControlLabel, Radio } from "@mui/material";


export interface RadioItem {
    value: string;
    label: string;
}

interface RadioSelectProps {
    items: RadioItem[];

    onChange: (selectedValue: string) => void;
    selectedValue: string;
}

class RadioSelect extends React.Component<RadioSelectProps> {
    constructor(props: RadioSelectProps) {
        super(props);
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(event.target.value);
    };

    render() {
        const {items} = this.props;
        return (
            <div>
                {items.map((item: RadioItem) => {
                    return (
                        <FormControlLabel
                            key={item.value}
                            value={item.value}
                            label={item.label}
                            control={
                                <Radio
                                    key={item.value}
                                    checked={this.props.selectedValue === item.value}
                                    value={item.value}
                                    aria-label={item.label}
                                    onChange={this.handleChange}
                                />
                            }
                        />

                    )
                })}
            </div>
        )
    }
}

export default RadioSelect;
