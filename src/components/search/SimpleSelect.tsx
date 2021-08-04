import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import FormControl from "@material-ui/core/FormControl/FormControl";
import { SelectItem } from "./SelectItems";
import InputLabel from "@material-ui/core/InputLabel";


const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing() * 2,
    },
});

interface SimpleSelectProps extends WithStyles<typeof styles> {
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
        const { classes } = this.props;
        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor={this.props.name.toLocaleLowerCase()}>{this.props.name.toLocaleLowerCase()}</InputLabel>
                <Select
                    value={this.props.selectedItem}
                    name={this.props.name}
                    onChange={this.handleOnChange}
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




export default withStyles(styles)(SimpleSelect)
