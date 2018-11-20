import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import { ProductGroup } from "../../types/dataset";
import Input from '@material-ui/core/Input';
import Chip from "@material-ui/core/Chip/Chip";
import classNames from "classnames";


const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
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

export class MultipleSelect extends React.Component<MultipleSelectProps> {
    state = {
        groups: ['None', ],
    };

    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        this.setState({groups: event.target.value});
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
                    value={pg.name}
                    className={classNames(this.getStyles(pg.name))}
                >
                    {pg.name}
                </MenuItem>
            )
        }
        return items;
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <InputLabel htmlFor="product-groups">Product Groups</InputLabel>
                <Select
                    multiple
                    value={this.state.groups}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'Product Groups',
                        id: 'product-groups',
                    }}
                    input={<Input id="select-multiple"/>}
                    MenuProps={MenuProps}
                    variant={"outlined"}
                    renderValue={(selected: string[]) => (
                        <div className={classes.chips}>
                            {selected.map(value => (
                                <Chip key={value} label={value} className={classes.chip}/>
                            ))}
                        </div>
                    )}
                >
                    {this.renderItems()}
                </Select>
            </div>
        );
    }
}


