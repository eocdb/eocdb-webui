import * as React from "react";
import { SelectItem } from "./SelectItems";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


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

interface SimpleSelectProps {
    name: string;
    selectedItem: string;
    items: SelectItem[];
    onChange: (selectedItem: string) => void;
}

class SimpleSelect extends React.Component<SimpleSelectProps> {
    constructor(props: SimpleSelectProps) {
        super(props);
    }

    handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.onChange(event.target.value);
    };

    render() {
        return (
            <FormControl>
                <InputLabel htmlFor={this.props.name.toLocaleLowerCase()}>{this.props.name.toLocaleLowerCase()}</InputLabel>
                <Select
                    value={this.props.selectedItem}
                    name={this.props.name}
                    // onChange={this.handleOnChange}
                    inputProps={{
                        name: this.props.name,
                        id: this.props.name.toLocaleLowerCase(),
                    }}
                >
                    <MenuItem value={"all"}>
                        <em>all</em>
                    </MenuItem>
                    {this.props.items.map((item: SelectItem) => {
                        return (<MenuItem key={item.key} value={item.key}>{item.label}</MenuItem>);
                    })}
                </Select>
            </FormControl>
        );
    }
}




export default SimpleSelect;
