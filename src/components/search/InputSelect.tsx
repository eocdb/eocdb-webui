import * as React from "react";
import Select from "react-select";
import { Suggestion } from "./MultipleSelectTextField";
import { FormControlLabel } from "@mui/material";



// const styles = (theme: Theme) => createStyles({
//     root: {
//         flexGrow: 1,
//         height: 250,
//     },
//     container: {
//         flexGrow: 1,
//         position: 'relative',
//     },
//     paper: {
//         position: 'absolute',
//         zIndex: 1,
//         marginTop: theme.spacing.unit,
//         left: 0,
//         right: 0,
//     },
//     chip: {
//         margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
//     },
//     inputRoot: {
//         flexWrap: 'wrap',
//     },
//     inputInput: {
//         width: 'auto',
//         flexGrow: 1,
//     },
//     divider: {
//         height: theme.spacing.unit * 2,
//     },
//     basicmultiselect: {
//         width: 150,
//         marginTop: theme.spacing.unit,
//         marginLeft: theme.spacing.unit,
//         marginRight: theme.spacing.unit,
//     }
// });


interface MultipleSelectTextFieldProps {
    items: Suggestion[];
    selectedItem: Suggestion;

    onChange: (selectedItem: Suggestion) => void;

    placeholder?: string;
    label?: string;
}


class MultipleSelectTextField extends React.Component<MultipleSelectTextFieldProps> {
    constructor(props: MultipleSelectTextFieldProps) {
        super(props);
    }

    onChange = (value: Suggestion) => {
        this.props.onChange(value);
    };

    render() {
        const {placeholder} = this.props;

        return (
            <FormControlLabel
                label={this.props.label}
                control={<Select
                    value={this.props.selectedItem}
                    options={this.props.items}
                    // className={classes.basicmultiselect}
                    onChange={this.onChange}
                    placeholder={placeholder}
                />}
            />
        );
    }
}

export default MultipleSelectTextField;
