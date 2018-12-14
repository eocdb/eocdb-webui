import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import FormControl from "@material-ui/core/FormControl/FormControl";


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

interface WaveLengthSelectProps extends WithStyles<typeof styles> {
    currentSelect: string;
    //onChange: () => void;
}

class WaveLengthSelect extends React.Component<WaveLengthSelectProps> {
    constructor(props: WaveLengthSelectProps) {
        super(props);

    }

    handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event);
    };

    render() {
        const { classes } = this.props;
        return (
            <FormControl className={classes.formControl}>
                <Select
                    value={this.props.currentSelect}
                    name={'Wavelength'}
                    onChange={this.handleOnChange}
                    inputProps={{
                        name: 'WaveLength',
                        id: 'wavelength',
                    }}
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value={'Multispectral'}>Multispectral</MenuItem>
                    <MenuItem value={'Hyperspectral'}>Hyperspectral</MenuItem>
                </Select>
            </FormControl>
        );
    }
}


export default withStyles(styles)(WaveLengthSelect)