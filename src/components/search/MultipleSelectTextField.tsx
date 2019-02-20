import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Select from "react-select";


export interface Suggestion {
    value: string;
    label: string;
}


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
        width: 400,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        height: 100,
    }
});

const customStyles = {
    control: (base: any) => ({
        ...base,
        width: 400,
        'min-height': '56px',
    }),
};


interface MultipleSelectTextFieldProps extends WithStyles<typeof styles> {
    suggestions: Suggestion[];
    selectedItems: Suggestion[];

    onChange: (selectedItems: Suggestion[]) => void;

    isMulti: boolean;
    closeMenuOnSelect: boolean;

    placeholder?: string;
}


const orderOptions = (values: any) => {
    return values.filter((v: any) => v.isFixed).concat(values.filter((v: any) => !v.isFixed));
};


class MultipleSelectTextField extends React.Component<MultipleSelectTextFieldProps> {
    constructor(props: MultipleSelectTextFieldProps) {
        super(props);
    }

    onChange = (value: Suggestion[], {action, removedValue}: any) => {
        switch (action) {
            case 'remove-value':
            case 'pop-value':
                if (removedValue.isFixed) {
                    return;
                }
                break;
            case 'clear':
                value = this.props.selectedItems.filter((v: any) => v.isFixed);
                break;
        }

        value = orderOptions(value);
        this.props.onChange(value);
    };

    render() {
        const {placeholder} = this.props;

        let plh = 'Select...';
        if (placeholder) {
            plh = placeholder;
        }

        return (
            <Select
                closeMenuOnSelect={this.props.closeMenuOnSelect}
                value={this.props.selectedItems}
                isMulti={this.props.isMulti}
                name="colors"
                options={this.props.suggestions}
                onChange={this.onChange}
                styles={customStyles}
                placeholder={plh}
            />
        );
    }
}

export default withStyles(styles)(MultipleSelectTextField);