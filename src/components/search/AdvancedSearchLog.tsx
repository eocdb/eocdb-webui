import * as React from "react";
import ChipsArray from "../../components/search/ChipsArray";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import { LatLngBounds } from "leaflet";
import { SELECTED_BOUNDS_DEFAULT } from "../../states/advancedSearchState";
import { WavelengthsMode } from "../../api/findDatasets";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    root: {}
});

interface AdvancedSearchLogProps extends WithStyles<typeof styles> {
    onBBoxChange: (selectedBounds: LatLngBounds) => void;
    selectedBounds: LatLngBounds;

    onWavelengthSelect: (item: string) => void;
    selectedWavelength: WavelengthsMode;
}

class AdvancedSearchLog extends React.PureComponent<AdvancedSearchLogProps> {
    constructor(props: AdvancedSearchLogProps) {
        super(props);
    }

    getFilterChipEntries() {
        let chips = [];

        if (!this.props.selectedBounds.equals(SELECTED_BOUNDS_DEFAULT)) {
            const label = 'bbox: ' + this.props.selectedBounds.toBBoxString();
            chips.push({key: 'bbox', label: label});
        }

        if(this.props.selectedWavelength !== "all"){
            const label = 'wavelength: ' + this.props.selectedWavelength;
            chips.push({key: 'wavelength', label: label});
        }

        return chips;
    }

    handleFilterDelete = (key: string) => {
        switch (key) {
            case 'bbox': {
                return this.props.onBBoxChange(SELECTED_BOUNDS_DEFAULT);
            }
            case 'wavelength': {
                return this.props.onWavelengthSelect("all");
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