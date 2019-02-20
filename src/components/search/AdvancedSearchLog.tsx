import * as React from "react";
import ChipsArray from "../../components/search/ChipsArray";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import { LatLng, latLngBounds } from "leaflet";
import { SELECTED_BOUNDS_DEFAULT } from "../../states/advancedSearchState";
import { BBoxValue } from "./BBoxInput";
import { SliderRange } from "./AdvancedSearchDialog";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    root: {}
});

interface AdvancedSearchLogProps extends WithStyles<typeof styles> {
    updateBBox: (selectedBBox: BBoxValue) => void;
    selectedBBox: BBoxValue;

    updateWavelength: (item: string) => void;
    selectedWavelength: string;

    updateWaterDepth: (waterDepth: SliderRange) => void;
    waterDepth: SliderRange;

    updateOptShallow: (optShallow: string) => void;
    selectedOptShallow: string;

    updateProducts: (products: string[]) => void;
    selectedProducts: string[];

}

class AdvancedSearchLog extends React.PureComponent<AdvancedSearchLogProps> {
    constructor(props: AdvancedSearchLogProps) {
        super(props);
    }

    getFilterChipEntries() {
        let chips = [];

        if (this.props.selectedBBox[0]
            && this.props.selectedBBox[1]
            && this.props.selectedBBox[2]
            && this.props.selectedBBox[3]) {
            const bnds1 = new LatLng(this.props.selectedBBox[0], this.props.selectedBBox[1]);
            const bnds2 = new LatLng(this.props.selectedBBox[2], this.props.selectedBBox[3]);
            const bbox = latLngBounds(bnds1, bnds2);
            const label = 'bbox: ' + bbox.toBBoxString();
            chips.push({key: 'bbox', label: label});
        }

        if (this.props.selectedWavelength !== "all") {
            const label = 'wavelength: ' + this.props.selectedWavelength;
            chips.push({key: 'wavelength', label: label});
        }

        if (this.props.waterDepth[0] !== undefined && this.props.waterDepth[1] !== undefined) {
            const label = 'water depth: ' + this.props.waterDepth.join(' ');
            chips.push({key: 'waterdepth', label: label});
        }

        if (this.props.selectedProducts.length > 0) {
            const label = 'products: ' + this.props.selectedProducts.join(', ');
            chips.push({key: 'products', label: label});
        }

        return chips;
    }

    handleFilterDelete = (key: string) => {
        switch (key) {
            case 'bbox': {
                return this.props.updateBBox(SELECTED_BOUNDS_DEFAULT);
            }
            case 'wavelength': {
                return this.props.updateWavelength("all");
            }
            case 'waterdepth': {
                return this.props.updateWaterDepth([undefined, undefined]);
            }
            case 'products': {
                return this.props.updateProducts([]);
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