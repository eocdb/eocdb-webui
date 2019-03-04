import * as React from "react";
import ChipsArray from "../../components/search/ChipsArray";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import { LatLng, latLngBounds } from "leaflet";
import { SELECTED_BOUNDS_DEFAULT } from "../../states/advancedSearchState";
import { BBoxValue } from "./BBoxInput";
import { SliderRange } from "../../types/advancedSearchDialog";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    root: {}
});

interface AdvancedSearchLogProps extends WithStyles<typeof styles> {
    onBBoxChange: (selectedBBox: BBoxValue) => void;
    bboxValue: BBoxValue;

    onWavelengthChange: (item: string) => void;
    wavelengthValue: string;

    onWaterDepthChange: (waterDepth: SliderRange) => void;
    waterDepthValue: SliderRange;

    onOptShallowChange: (optShallow: string) => void;
    optShallowValue: string;

    onProductsChange: (products: string[]) => void;
    productsValue: string[];
}

class AdvancedSearchLog extends React.PureComponent<AdvancedSearchLogProps> {
    constructor(props: AdvancedSearchLogProps) {
        super(props);
    }

    getFilterChipEntries() {
        let chips = [];

        if (this.props.bboxValue[0]  !== ''
            && this.props.bboxValue[1]  !== ''
            && this.props.bboxValue[2] !== ''
            && this.props.bboxValue[3] !== '') {
            const bnds1 = new LatLng(+this.props.bboxValue[0], +this.props.bboxValue[1]);
            const bnds2 = new LatLng(+this.props.bboxValue[2], +this.props.bboxValue[3]);
            const bbox = latLngBounds(bnds1, bnds2);
            const label = 'bbox: ' + bbox.toBBoxString();
            chips.push({key: 'bbox', label: label});
        }

        if (this.props.wavelengthValue !== "all") {
            const label = 'wavelength: ' + this.props.wavelengthValue;
            chips.push({key: 'wavelength', label: label});
        }

        if (this.props.waterDepthValue[0] !== 0 && this.props.waterDepthValue[1] !== 1000) {
            const label = 'water depth: ' + this.props.waterDepthValue.join(' ');
            chips.push({key: 'waterdepth', label: label});
        }

        if (this.props.productsValue.length > 0) {
            const label = 'products: ' + this.props.productsValue.join(', ');
            chips.push({key: 'products', label: label});
        }

        if (this.props.optShallowValue) {
            const label = 'opt shallow:' + this.props.optShallowValue;
            chips.push({key: 'optshallow', label: label});
        }

        return chips;
    }

    handleFilterDelete = (key: string) => {
        switch (key) {
            case 'bbox': {
                return this.props.onBBoxChange(SELECTED_BOUNDS_DEFAULT);
            }
            case 'wavelength': {
                return this.props.onWavelengthChange("all");
            }
            case 'waterdepth': {
                return this.props.onWaterDepthChange([0, 1000]);
            }
            case 'products': {
                return this.props.onProductsChange([]);
            }
            case 'optshallow': {
                return this.props.onOptShallowChange('');
            }
        }
    };

    render() {
        return (
            <ChipsArray chipData={this.getFilterChipEntries()} onDelete={this.handleFilterDelete}/>
        );
    }
}

export default withStyles(styles)(AdvancedSearchLog);