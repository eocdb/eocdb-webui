import * as React from 'react';
import { Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";


// const styles = (theme: Theme) => createStyles(
//     {
//         root: {
//             display: 'flex',
//             flexWrap: 'wrap',
//             position: "relative",
//             flexGrow: 1,
//             height: 250,
//             '& div':{
//                 zIndex:1
//             }
//         },
//         chip: {
//             margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
//         },
//         formControl: {
//             minWidth: 200,
//             position: 'relative',
//             zIndex: 999,
//         },
//         select: {
//             minHeight: 20,
//             zIndex: 999,
//         },
//         fontRegular: {
//             fontWeight: theme.typography.fontWeightRegular,
//         },
//         fontMedium: {
//             fontWeight: theme.typography.fontWeightMedium,
//         },
//     });
//

interface MultipleSelectProps {
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
            zIndex: 999,
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

    // getStyles = (name: string) => {
    //     return (this.props.selectedItems.indexOf(name) === -1
    //         ? this.props.classes.fontRegular
    //         : this.props.classes.fontMedium)
    // };
    //
    renderItems = () => {
        const pgs = this.props.items;

        let items = [];
        for (let pg of pgs) {
            items.push(
                <MenuItem
                    key={pg}
                    value={pg}
                    // className={classNames(this.getStyles(pg))}
                >
                    {/*<Checkbox checked={this.props.selectedItems.indexOf(pg) > -1}/>*/}
                    {pg}
                </MenuItem>
            )
        }
        return items;
    };

    renderNativeItems = () => {
        const pgs = this.props.items;

        let items = [];
        for (let pg of pgs) {
            items.push(
                <option
                    key={pg}
                    value={pg}
                >
                    {pg}
                </option>
            )
        }
        return items;
    };

    renderSelectedValues = (selected: string[]) => {
        // const {classes} = this.props;
        return (
            <div>
                {selected.map(value => (
                    <Chip
                        //style={{height: '13pt'}}
                        // className={classes.chip}
                        key={value}
                        label={value}
                        onDelete={() => this.handleDelete(value)}
                    />
                ))}
            </div>
        );
    };

    render() {
        // const {classes} = this.props;
        return (
            <div>
                <FormControl variant="outlined">
                    <InputLabel
                        htmlFor="select-multiple"
                        shrink
                        variant={"outlined"}
                    >
                        Product Groups
                    </InputLabel>
                    <Select
                        // className={classes.select}
                        multiple
                        value={this.props.selectedItems}
                        // onChange={this.handleChange}
                        MenuProps={MenuProps}
                        input={<OutlinedInput name={'test'} id={"select-multiple"} />}
                        renderValue={this.renderSelectedValues}
                    >
                        {this.renderItems()}
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default MultipleSelect;
