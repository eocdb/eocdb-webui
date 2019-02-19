import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "react-select";
import { Suggestion } from "./MultipleSelectTextField";


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
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
    basicmultiselect: {
        width: 300,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    }
});


interface MultipleSelectTextFieldProps extends WithStyles<typeof styles>{
    items: Suggestion[];
    selectedItem: Suggestion;

    onChange: (selectedItem: Suggestion) => void;
}


class MultipleSelectTextField extends React.Component<MultipleSelectTextFieldProps> {
    constructor(props: MultipleSelectTextFieldProps) {
        super(props);
    }

    onChange = (value: Suggestion) => {
        this.props.onChange(value);
    };

    render() {
        const { classes } = this.props;

        return (
            <Select
                value={this.props.selectedItem}
                name="colors"
                options={this.props.items}
                className={classes.basicmultiselect}
                classNamePrefix={"select"}
                onChange={this.onChange}
            />
        );
    }
}

export default withStyles(styles)(MultipleSelectTextField);