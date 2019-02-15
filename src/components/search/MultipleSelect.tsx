import * as React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Select from '@material-ui/core/Select/Select';
import Chip from '@material-ui/core/Chip/Chip';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import OutlinedInput from "@material-ui/core/OutlinedInput";


const styles = (theme: Theme) => createStyles(
    {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
        },
        formControl: {
            minWidth: 200,

        },
        select: {
            minHeight: 20,
        },
        fontRegular: {
            fontWeight: theme.typography.fontWeightRegular,
        },
        fontMedium: {
            fontWeight: theme.typography.fontWeightMedium,
        },
    });


interface MultipleSelectProps extends WithStyles<typeof styles> {
    open: boolean;
    onClose: () => void;
    items: string[];

    onChange: (selectedItems: string[]) => void;
    selectedItems: string[];
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 300,
        },
    },
};

interface TestState {
    labelWidth: number;
}

class MultipleSelect extends React.Component<MultipleSelectProps, TestState> {
    constructor(props: MultipleSelectProps) {
        super(props);

        this.state = {
            labelWidth: 0,
        };

    }

    handleClose = () => {
        this.props.onClose();
    };

    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const options = event.target.value;

        let value = [];
        // Added type check as event.target.value is of type string but we get string[].
        if (Array.isArray(options)) {
            for (let i = 0, l = options.length; i < l; i++) {
                value.push(options[i]);
            }
        } else {
            value.push(options);
        }

        this.props.onChange(value);

    };

    handleDelete(value: string) {
        const items = Object.assign(this.props.selectedItems);
        const index = items.indexOf(value, 0);
        if (index > -1) {
            items.splice(index, 1);
        }

        this.props.onChange(items);
    }

    getStyles = (name: string) => {
        return (this.props.selectedItems.indexOf(name) === -1
            ? this.props.classes.fontRegular
            : this.props.classes.fontMedium)
    };

    renderItems = () => {
        const pgs = this.props.items;

        let items = [];
        for (let pg of pgs) {
            items.push(
                <MenuItem
                    key={pg}
                    value={pg}
                    className={classNames(this.getStyles(pg))}
                >
                    <Checkbox checked={this.props.selectedItems.indexOf(pg) > -1}/>
                    {pg}
                </MenuItem>
            )
        }
        return items;
    };

    renderSelectedValues = (selected: string[]) => {
        const {classes} = this.props;
        return (
            <div>
                {selected.map(value => (
                    <Chip
                        //style={{height: '13pt'}}
                        className={classes.chip}
                        key={value}
                        label={value}
                        onDelete={() => this.handleDelete(value)}
                    />
                ))}
            </div>
        );
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        htmlFor="select-multiple"
                    >
                        Product Groups
                    </InputLabel>
                    <Select
                        className={classes.select}
                        multiple
                        value={this.props.selectedItems}
                        onChange={this.handleChange}
                        input={<OutlinedInput
                            id="select-multiple"
                            labelWidth={130}
                        />}
                        MenuProps={MenuProps}
                        renderValue={this.renderSelectedValues}
                    >
                        {this.renderItems()}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles)(MultipleSelect);
