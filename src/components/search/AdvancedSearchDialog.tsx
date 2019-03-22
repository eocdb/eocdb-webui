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
import BBoxInput, { BBoxValue } from "./BBoxInput";
import { wavelengthItems } from "./SelectItems";
import MinMaxInputSlider from "./MinMaxInputSlider";
import RadioSelect, { RadioItem } from "./RadioSelect";
import MultipleSelectTextField, { Suggestion } from "./MultipleSelectTextField";
import Typography from "@material-ui/core/Typography";
import { SliderRange } from "../../types/advancedSearchDialog";
import { Product } from "../../model";
import { LatLngBounds } from "leaflet";


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

    onBBoxChange: (selectedBBox: BBoxValue) => void;
    bboxValue: BBoxValue;
    mapBBoxValue: LatLngBounds;

    onWavelengthChange: (item: string) => void;
    wavelengthValue: string;

    onWaterDepthChange: (waterDepth: SliderRange) => void;
    waterDepthValue: SliderRange;

    onOptShallowChange: (optShallow: string) => void;
    optShallowValue: string;

    onProductsChange: (products: string[]) => void;
    productsValue: string[];

    productItems: Product[];
}


const items: RadioItem[] = [
    {
        value: 'yes',
        label: 'Yes',
    },
    {
        value: 'no',
        label: 'No',
    },
    {
        value: 'exclusively',
        label: 'Exclusively',
    }
];

class AdvancedSearchDialog extends React.Component<AdvancedSearchDialogProps> {
    constructor(props: AdvancedSearchDialogProps) {
        super(props);
    }

    handleWaveLengthSelect = (item: string) => {
         this.props.onWavelengthChange(item);
    };

    handleWaterDepthChange = (waterDepth: SliderRange) => {
        this.props.onWaterDepthChange(waterDepth);
    };

    handleUpdateProducts = (products: Suggestion[]) => {
        const items = products.map((item: Suggestion) => {
            return item.value;
        });

        this.props.onProductsChange(items);
    };

    makeProductSuggestions = () => {
        return this.props.productItems.map((item: Product) => {
            return {
                value: item.name,
                label: item.name,
            };
        })
    };

    makeSelectedProducts = () => {
        return this.props.productsValue.map((item: string) => {
            return {
                value: item,
                label: item,
            };
        });
    };

    render() {
        const {classes, wavelengthValue, mapBBoxValue} = this.props;
        let selectedBBox = this.props.bboxValue;

        if (mapBBoxValue) {
            selectedBBox = [
                +mapBBoxValue.getSouth(),
                +mapBBoxValue.getWest(),
                +mapBBoxValue.getNorth(),
                +mapBBoxValue.getEast()
            ];
        }

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                TransitionComponent={Transition}
            >
                <div className={classes.dialogContent}>
                    <DialogTitle id="form-dialog-title">Advanced Search</DialogTitle>
                    <Grid spacing={32} container direction={'row'} justify={'flex-start'} alignItems={"flex-start"}>
                        <Grid item xs={12}>
                            <Typography component={'h2'}>Region</Typography>
                            <BBoxInput
                                onBBoxChange={this.props.onBBoxChange}
                                selectedBBox={selectedBBox}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component={'h2'}>Wavelength</Typography>
                            <RadioSelect items={wavelengthItems}
                                         selectedValue={wavelengthValue}
                                         onChange={this.handleWaveLengthSelect}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component={'h2'}>Water Depth</Typography>
                            <MinMaxInputSlider
                                value={this.props.waterDepthValue}
                                onChange={this.handleWaterDepthChange}

                                label={'Water Depth'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component={'h2'}>Select Optical</Typography>
                            <RadioSelect items={items}
                                         selectedValue={this.props.optShallowValue}
                                         onChange={this.props.onOptShallowChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component={'h2'}>Select Products</Typography>
                            <MultipleSelectTextField
                                suggestions={this.makeProductSuggestions()}
                                onChange={this.handleUpdateProducts}
                                selectedItems={this.makeSelectedProducts()}
                                isMulti={true}
                                closeMenuOnSelect={false}
                            />
                        </Grid>
                    </Grid>

                    <DialogActions className={classes.appBar}>
                        <Button onClick={this.props.onClose}
                                aria-label="Close"
                                variant="contained"
                                color="secondary"
                        >
                            Apply
                        </Button>
                        <Button onClick={this.props.onClose}
                                aria-label="Close"
                                variant="contained"
                                color="secondary"
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        );
    }
}


export default withStyles(styles)(AdvancedSearchDialog);

