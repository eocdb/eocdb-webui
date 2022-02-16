import * as React from "react";

import { wavelengthItems } from "./SelectItems";
import MinMaxInputSlider from "./MinMaxInputSlider";
import RadioSelect, { RadioItem } from "./RadioSelect";
import MultipleSelectTextField from "./MultipleSelectTextField";
import { SliderRange } from "../../types/advancedSearchDialog";
import { Product } from "../../model";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Divider, Paper,
    Slide, Stack, styled,
    Typography
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


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


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


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
                keepMounted
                TransitionComponent={Transition}
            >
                <DialogTitle id="form-dialog-title">Advanced Search</DialogTitle>
                <Divider/>
                <DialogContent>
                    <Stack direction={'column'} spacing={5}>
                        <Item>
                            <Typography gutterBottom={true} variant={'h6'}>Wavelength options</Typography>
                            <RadioSelect items={wavelengthItems}
                                         selectedValue={wavelengthValue}
                                         onChange={this.handleWaveLengthSelect}
                            />
                        </Item>
                        <Item>
                            <Typography gutterBottom={true} variant={'h6'}>Water Depth</Typography>
                            <MinMaxInputSlider
                                value={this.props.waterDepthValue}
                                onChange={this.handleWaterDepthChange}

                                label={'Water Depth'}
                            />
                        </Item>
                        <Item>
                            <Typography gutterBottom={true} variant={'h6'}>Include optically shallow waters</Typography>
                            <RadioSelect items={items}
                                         selectedValue={this.props.optShallowValue}
                                         onChange={this.props.onOptShallowChange}
                            />
                        </Item>
                        <Item>
                            <Typography gutterBottom={true} variant={'h6'}>Select Products</Typography>
                            <MultipleSelectTextField
                                suggestions={this.makeProductSuggestions()}
                                onChange={this.handleUpdateProducts}
                                selectedItems={this.makeSelectedProducts()}
                                isMulti={true}
                                closeMenuOnSelect={false}
                            />
                        </Item>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose}
                            aria-label="Close"
                            variant="contained"
                            color="secondary"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


export default AdvancedSearchDialog;

