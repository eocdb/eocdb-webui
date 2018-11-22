import * as React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Select from '@material-ui/core/Select/Select';
import { ProductGroup } from '../../types/dataset';
import Chip from '@material-ui/core/Chip/Chip';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";



const styles = (theme: Theme) => createStyles(
    {
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            minWidth: 200,
            maxWidth: 300,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
            justify: 'center',
            height: '20px',
        },
        multipleSelect: {
            labelWidth: 150,
        },
        chip: {
            margin: theme.spacing.unit / 4,
        },
        noLabel: {
            marginTop: theme.spacing.unit * 3,
        },
        fontRegular: {
            fontWeight: theme.typography.fontWeightRegular,
        },
        fontMedium: {
            fontWeight: theme.typography.fontWeightMedium,
        },
    });


interface MultipleSelectProps extends WithStyles<typeof styles> {
    open?: boolean;
    productGroups: ProductGroup[];

    productGroupsChange: (productGroups: string[]) => void;
}

interface MultipleSelectState {
    groups: string[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class MultipleSelect extends React.Component<MultipleSelectProps, MultipleSelectState> {
    constructor(props: MultipleSelectProps) {
        super(props);

        this.state = {
            groups: []
        };
    }

    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const options = event.target.value;

        let value = [];
        // Added type check as event.target.value is of type string but we get string[].
        if (Array.isArray(options)) {
            for (let i = 0, l = options.length; i < l; i++) {
                value.push(options[i]);
            }
        }
        else {
            value.push(options);
        }

        this.setState({groups: value});
        this.props.productGroupsChange(value);

    };

    getStyles = (name: string) => {
        return (this.state.groups.indexOf(name) === -1
            ? this.props.classes.fontRegular
            : this.props.classes.fontMedium)
    };

    renderItems = () => {
        const pgs = this.props.productGroups;
        let items = [];
        for (let pg of pgs) {
            items.push(
                <MenuItem
                    key={pg.name}
                    value={pg.name}
                    className={classNames(this.getStyles(pg.name))}
                >
                    {pg.name}
                </MenuItem>
            )
        }
        return items;
    };

    renderSelectedValues = (selected: string[]) => {
        const {classes} = this.props;
        return (
            <div className={classes.chips}>
                {selected.map(value => (
                    <Chip color={"primary"} key={value} label={value} className={classes.chip}/>
                ))}
            </div>
        );
    };

    render() {
        const {classes} = this.props;
        return (
            <FormControl className={classes.formControl}>
                <InputLabel variant={"outlined"} shrink={true} htmlFor="select-multiple">Product Groups</InputLabel>
                <Select
                    multiple
                    value={this.state.groups}
                    onChange={this.handleChange}
                    input={<OutlinedInput
                        id="select-multiple"
                        labelWidth={150}
                    />}
                    MenuProps={MenuProps}
                    renderValue={this.renderSelectedValues}
                >
                    {this.renderItems()}
                </Select>
            </FormControl>
        );
    }
}

export default withStyles(styles)(MultipleSelect);
