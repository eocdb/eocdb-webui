import { PureComponent } from "react";
import TextField from "@material-ui/core/TextField/TextField";
import * as React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Grid,
    Theme,
    withStyles,
    WithStyles
} from "@material-ui/core";


import createStyles from "@material-ui/core/styles/createStyles";
import { LatLng, LatLngBounds } from "leaflet";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    searchField: {
        width: 200,
        marginRight: theme.spacing() / 2,
        marginTop: theme.spacing() / 2,
    },
    dialogContent: {
        marginLeft: theme.spacing() * 4,
        marginRight: theme.spacing() * 4,
        marginTop: theme.spacing() * 4,
        marginBottom: theme.spacing() * 4,
    },
    textField: {},
    button: {},
    rightIcon: {},
    tableContainer: {},
});

interface BBoxInputProps extends WithStyles<typeof styles> {
    open: boolean;
    onClose: () => void;

    onSouthChange: (south: number | string) => void;
    south: number | string;

    onWestChange: (west: number | string) => void;
    west: number | string;

    onNorthChange: (north: number | string) => void;
    north: number | string;

    onEastChange: (east: number | string) => void;
    east: number | string;

    onBBoxSave: (selectedBounds: LatLngBounds) => void;
}

/*function Transition(props: SlideProps) {
    return <Slide direction="up" {...props} />;
}*/

const BBoxInput = class extends PureComponent<BBoxInputProps> {
    constructor(props: BBoxInputProps) {
        super(props);
    }

    handleOnChange = () => {
        const {north, east, south, west} = this.props;

        this.props.onBBoxSave(new LatLngBounds(new LatLng(+north, +east), new LatLng(+south, +west)));
    };

    handleSouthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const south = event.target.valueAsNumber;
        this.props.onSouthChange(south);
    };

    handleWestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const west = event.target.valueAsNumber;
        this.props.onWestChange(west);
    };

    handleNorthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const north = event.target.valueAsNumber;
        this.props.onNorthChange(north);
    };

    handleEastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const east = event.target.valueAsNumber;
        this.props.onEastChange(east);
    };

    render() {
        const {classes} = this.props;

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                //TransitionComponent={Transition}
            >
                <div className={classes.dialogContent}>
                    <DialogTitle id="form-dialog-title">Coordinates</DialogTitle>

                    <Grid spacing={10} container direction={'row'} justify={'flex-start'} alignItems={"flex-start"}>
                        <Grid item xs={12}>
                            <TextField
                                id={'bbox_bottom'}
                                label={'South'}
                                variant={'outlined'}
                                type={"number"}
                                className={classes.searchField}
                                // onBlur={this.handleSouthChange}
                                defaultValue={this.props.south}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id={'bbox_left'}
                                label={'West'}
                                variant={'outlined'}
                                type={"number"}
                                className={classes.searchField}
                                onChange={this.handleWestChange}
                                defaultValue={this.props.west}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id={'bbox_top'}
                                label={'North'}
                                variant={'outlined'}
                                type={"number"}
                                className={classes.searchField}
                                onChange={this.handleNorthChange}
                                defaultValue={this.props.north}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id={'bbox_right'}
                                label={'East'}
                                variant={'outlined'}
                                type={"number"}
                                className={classes.searchField}
                                onChange={this.handleEastChange}
                                defaultValue={this.props.east}
                            />
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <Button
                            onClick={() => this.handleOnChange()}
                            aria-label="Close"
                            variant="contained"
                            color="secondary"
                        >
                            Apply
                        </Button>
                        <Button
                            onClick={this.props.onClose}
                            aria-label="Close"
                            variant="contained"
                            color="secondary"
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        )
    }
};

export default withStyles(styles)(BBoxInput);
