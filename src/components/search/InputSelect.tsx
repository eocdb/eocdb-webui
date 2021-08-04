import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "react-select";
import { Suggestion } from "./MultipleSelectTextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";



const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        height: 250,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(),
        left: 0,
        right: 0,
    },
    chip: {
        margin: `${theme.spacing() / 2}px ${theme.spacing() / 4}px`,
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing() * 2,
    },
    basicmultiselect: {
        width: 150,
        marginTop: theme.spacing(),
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
    }
});


interface MultipleSelectTextFieldProps extends WithStyles<typeof styles> {
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
        const {classes, placeholder} = this.props;

        return (
            <FormControlLabel
                label={this.props.label}
                control={<Select
                    value={this.props.selectedItem}
                    options={this.props.items}
                    className={classes.basicmultiselect}
                    onChange={this.onChange}
                    placeholder={placeholder}
                />}
            />
        );
    }
}

export default withStyles(styles)(MultipleSelectTextField);
