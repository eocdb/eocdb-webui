import * as React from "react";

import { wavelengthItems } from "./SelectItems";
import MinMaxInputSlider from "./MinMaxInputSlider";
import RadioSelect, { RadioItem } from "./RadioSelect";
import MultipleSelectTextField, { Suggestion } from "./MultipleSelectTextField";
import { SliderRange } from "../../types/advancedSearchDialog";
import { Product } from "../../model";
import { Button, Dialog, DialogActions, DialogTitle, Grid, Slide, SlideProps, Typography } from "@mui/material";


// const styles = (theme: Theme) => createStyles({
//     dialogContent: {
//         marginLeft: theme.spacing.unit * 4,
//         marginRight: theme.spacing.unit * 4,
//         marginTop: theme.spacing.unit * 4,
//         marginBottom: theme.spacing.unit * 4,
//     },
//     appBar: {
//         position: 'relative',
//     },
//     flex: {
//         flex: 1,
//     },
//     searchField: {
//         width: 200,
//         marginRight: theme.spacing.unit / 2,
//     },
//     textField: {},
//     button: {},
//     rightIcon: {},
//     tableContainer: {},
// });


//
// function Transition(props: SlideProps) {
//     return <Slide direction="up" {...props} />;
// }


export interface AdvancedSearchDialogProps {
    open: boolean;
    onClose: () => void;

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

    handleUpdateProducts = (products: string[]) => {
        const items = products.map((item: string) => {
            return item;
        });

        this.props.onProductsChange(items);
    };

    makeProductSuggestions = () => {
        return this.props.productItems.map((item: Product) => {
            return item.name;
        })
    };

    makeSelectedProducts = () => {
        return this.props.productsValue.map((item: string) => {
            return item;
        });
    };

    render() {
        const {wavelengthValue} = this.props;

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                // TransitionComponent={Transition}
            >
                {/*<div className={classes.dialogContent}>*/}
                <div>
                    <DialogTitle id="form-dialog-title">Advanced Search</DialogTitle>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography component={'h2'}>Wavelength options</Typography>
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
                            <Typography component={'h2'}>Include optically shallow waters</Typography>
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

                    <DialogActions>
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


export default AdvancedSearchDialog;

