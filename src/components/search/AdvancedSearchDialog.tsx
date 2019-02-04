import * as React from "react";
import { Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide, { SlideProps } from '@material-ui/core/Slide';

import createStyles from "@material-ui/core/styles/createStyles";
import { WithStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import WaveLengthSelect from "./SimpleSelect";
import BBoxInput from "./BBoxInput";
import { LatLngBounds } from "leaflet";
import { WavelengthsMode } from "../../api/findDatasets";
import { wavelengthItems } from "./SelectItems";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    searchField: {
        width: 300,
    },
    textField: {},
    button: {},
    rightIcon: {},
    tableContainer: {},
});


function Transition(props: SlideProps) {
    return <Slide direction="up" {...props} />;
}


export interface AdvancedSearchDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    onClose: () => void;

    onBBoxChange: (selectedBounds: LatLngBounds) => void;
    selectedBounds: LatLngBounds;

    onWavelengthSelect: (item: string) => void;
    selectedWavelength: WavelengthsMode;
}


class AdvancedSearchDialog extends React.Component<AdvancedSearchDialogProps> {
    constructor(props: AdvancedSearchDialogProps) {
        super(props);
    }

    handleWaveLengthSelect = (item: string) => {
        console.log(item);
        this.props.onWavelengthSelect(item);
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.props.open}
                    onClose={this.props.onClose}
                    TransitionComponent={Transition}
                >
                    <DialogTitle id="form-dialog-title">Advanced Search</DialogTitle>
                    <Grid spacing={16} container direction={'row'} justify={'flex-start'} alignItems={"flex-start"}>
                        <Grid item xs={12}>
                            <BBoxInput
                                onBBoxChange={this.props.onBBoxChange}
                                selectedBounds={this.props.selectedBounds}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <WaveLengthSelect
                                name={'Wavelength'}
                                items={wavelengthItems}
                                selectedItem={this.props.selectedWavelength}
                                onChange={this.handleWaveLengthSelect}
                            />
                        </Grid>
                    </Grid>
                    <DialogActions className={classes.appBar}>
                        <Button onClick={this.props.onClose}
                                aria-label="Close"
                                variant="contained"
                                color="secondary"
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default withStyles(styles)(AdvancedSearchDialog);

