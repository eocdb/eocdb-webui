import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import FormControl from "@material-ui/core/FormControl/FormControl";
import { SelectItem } from "./SelectItems";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";


const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

interface OutlinedSelectProps extends WithStyles<typeof styles> {
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
        const { classes } = this.props;
        return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                    htmlFor="outlined-age-simple"
                >
                    {this.props.label}
                </InputLabel>
                <Select
                    value={this.props.selectedItem}
                    onChange={this.handleOnChange}
                    input={
                        <OutlinedInput
                            labelWidth={this.props.labelWidth}
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

export default withStyles(styles)(OutlinedSelect)