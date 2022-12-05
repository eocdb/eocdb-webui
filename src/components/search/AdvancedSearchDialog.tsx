import * as React from "react";

import { wavelengthItems } from "./SelectItems";
import MinMaxInputSlider from "./MinMaxInputSlider";
import RadioSelect, { RadioItem } from "./RadioSelect";
import MultipleSelectTextField from "./MultipleSelectTextField";
import { SliderRange } from "../../types/advancedSearchDialog";
import { DatasetQuery, Product } from "../../model";
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Divider, FormControlLabel, Paper,
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

    productItems: Product[];

    datasetQuery: DatasetQuery;
    updateDatasetQuery: (datasetQuery: DatasetQuery) => void;
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
        const datasetQuery = {...this.props.datasetQuery, wavelengthsMode: item}
        this.props.updateDatasetQuery(datasetQuery);
    };

    handleWaterDepthChange = (waterDepth: SliderRange) => {
        const datasetQuery = {...this.props.datasetQuery, wdepth: waterDepth}
        this.props.updateDatasetQuery(datasetQuery);
    };

    handleUpdateProducts = (products: string[]) => {
        const items = products.map((item: string) => {
            return item;
        });
        const datasetQuery = {...this.props.datasetQuery, productNames: items}
        this.props.updateDatasetQuery(datasetQuery);
    };

    handleUpdateHasWdepth = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hasWdepth = event.target.checked;
        let wdepth: SliderRange = [null, null]
        if (hasWdepth) {
            wdepth = [0, 1000]
        }

        const datasetQuery = {...this.props.datasetQuery,
            hasWdepth: event.target.checked,
            wdepth: wdepth
        }
        this.props.updateDatasetQuery(datasetQuery);
    }

    handleShallowChange = (optShallow: string) => {
        const datasetQuery = {...this.props.datasetQuery, shallow: optShallow}
        this.props.updateDatasetQuery(datasetQuery);
    };

    makeProductSuggestions = () => {
        return this.props.productItems.map((item: Product) => {
            return item.name;
        })
    };

    render() {
        const hasWdepthLabel = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
                            <Typography gutterBottom={true} variant={"h6"}>Wavelength options</Typography>
                            <RadioSelect items={wavelengthItems}
                                         selectedValue={this.props.datasetQuery.wavelengthsMode}
                                         onChange={this.handleWaveLengthSelect}
                                         size={'small'}
                            />
                        </Item>
                        <Item>
                            <Typography gutterBottom={true} variant={'h6'}>Water Depth [m]</Typography>
                            <MinMaxInputSlider
                                value={this.props.datasetQuery.wdepth}
                                onChange={this.handleWaterDepthChange}
                                disabled={!this.props.datasetQuery.hasWdepth}
                                label={'Water Depth'}
                                size={'small'}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={this.handleUpdateHasWdepth}
                                        checked={this.props.datasetQuery.hasWdepth}
                                        {...hasWdepthLabel}
                                        size={"small"}
                                    />
                                }
                                label={"Enable Water depth"}/>
                        </Item>
                        <Item>
                            <Typography gutterBottom={true} variant={'h6'}>Include optically shallow waters</Typography>
                            <RadioSelect items={items}
                                         selectedValue={this.props.datasetQuery.shallow}
                                         onChange={this.handleShallowChange}
                                         size={"small"}
                            />
                        </Item>
                        <Item>
                            <Typography gutterBottom={true} variant={'h6'}>Select Products</Typography>
                            <MultipleSelectTextField
                                suggestions={this.makeProductSuggestions()}
                                onChange={this.handleUpdateProducts}
                                selectedItems={this.props.datasetQuery.productNames}
                                isMulti={true}
                                closeMenuOnSelect={false}
                                size={"small"}
                            />
                        </Item>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose}
                            aria-label="Close"
                            variant="contained"
                            color="secondary"
                            size={'small'}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


export default AdvancedSearchDialog;

