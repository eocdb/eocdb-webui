import * as React from "react";
import { SelectItem } from "./SelectItems";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";


// const styles = (theme: Theme) => createStyles({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     formControl: {
//         margin: theme.spacing.unit,
//         minWidth: 120,
//     },
//     selectEmpty: {
//         marginTop: theme.spacing.unit * 2,
//     },
// });

interface OutlinedSelectProps {
    name: string;
    selectedItem: string;
    items: SelectItem[];
    onChange: (selectedItem: string) => void;
    labelWidth: number;
    label: string;
}



export class OutlinedSelect extends React.Component<OutlinedSelectProps> {
    constructor(props: OutlinedSelectProps) {
        super(props);
    }

    handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.onChange(event.target.value);
    };

    render() {
        return (
            <FormControl variant="outlined">
                <InputLabel
                    htmlFor="outlined-age-simple"
                >
                    {this.props.label}
                </InputLabel>
                <Select
                    value={this.props.selectedItem}
                    // onChange={this.handleOnChange}
                    input={
                        <OutlinedInput
                            name="age"
                            id="outlined-age-simple"
                        />
                    }
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {this.props.items.map((item: SelectItem) => {
                        return (<MenuItem key={item.key} value={item.key}>{item.label}</MenuItem>);
                    })}
                </Select>
            </FormControl>
        );
    }
}

export default OutlinedSelect;
