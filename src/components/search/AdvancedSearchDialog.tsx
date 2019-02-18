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
import MinMaxInputSlider from "./MinMaxInputSlider";
import RadioSelect, { RadioItem } from "./RadioSelect";
import MultipleSelectTextField from "./MultipleSelectTextField";
import { Product } from "../../types/dataset";
import ReactSelect from "./ReactSelect";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    dialogContent: {
        marginLeft: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 4,
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4,
    },
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

    updateBBox: (selectedBounds: LatLngBounds) => void;
    selectedBounds: LatLngBounds;

    updateWavelength: (item: string) => void;
    selectedWavelength: WavelengthsMode;

    updateWaterDepth: (waterDepth: number[]) => void;
    waterDepth: number[];

    updateOptShallow: (optShallow: string) => void;
    selectedOptShallow: string;

    updateProducts: (products: string[]) => void;
    selectedProducts: string[];

    updateProductValue: (productInputValue: string) => void;
    productInputValue: string;

    productItems: Product[];
}


const items: RadioItem[] = [
    {
        name: 'Yes',
        value: 'yes',
        label: 'Yes',
    },
    {
        name: 'No',
        value: 'no',
        label: 'No',
    },
    {
        name: 'Exclusively',
        value: 'exclusively',
        label: 'Exclusively',
    }
];

class AdvancedSearchDialog extends React.Component<AdvancedSearchDialogProps> {
    constructor(props: AdvancedSearchDialogProps) {
        super(props);
    }

    handleWaveLengthSelect = (item: string) => {
        //console.log(item);
        this.props.updateWavelength(item);
    };

    handleWaterDepthChange = (waterDepth: number[]) => {
        this.props.updateWaterDepth(waterDepth);
    };

    makeSuggestions = () => {
        return this.props.productItems.map((item: Product) => {
            return {label: item.name};
        })
    };

    render() {
        const {classes} = this.props;
        return (
            <Dialog
                fullScreen
                open={this.props.open}
                onClose={this.props.onClose}
                TransitionComponent={Transition}
            >
                <div className={classes.dialogContent}>
                    <DialogTitle id="form-dialog-title">Advanced Search</DialogTitle>
                    <Grid spacing={32} container direction={'row'} justify={'flex-start'} alignItems={"flex-start"}>
                        <Grid item xs={12}>
                            <BBoxInput
                                onBBoxChange={this.props.updateBBox}
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
                        <Grid item xs={12}>
                            <MinMaxInputSlider
                                value={this.props.waterDepth}
                                onChange={this.handleWaterDepthChange}

                                label={'Water Depth'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <RadioSelect items={items}
                                         selectedValue={this.props.selectedOptShallow}
                                         onChange={this.props.updateOptShallow}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ReactSelect />
                            <MultipleSelectTextField
                                suggestions={this.makeSuggestions()}
                                onChange={this.props.updateProducts}
                                selectedItems={this.props.selectedProducts}
                                onInputChange={this.props.updateProductValue}
                                inputValue={this.props.productInputValue}
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
                </div>
            </Dialog>
        );
    }
}


export default withStyles(styles)(AdvancedSearchDialog);

