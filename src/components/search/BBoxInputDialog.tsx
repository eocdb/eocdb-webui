import { PureComponent } from "react";
import TextField from "@material-ui/core/TextField/TextField";
import * as React from "react";
import { Theme, withStyles, WithStyles } from "@material-ui/core";


import createStyles from "@material-ui/core/styles/createStyles";
import {LatLng, LatLngBounds} from "leaflet";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    searchField: {
        width: 200,
        marginRight: theme.spacing.unit / 2,
        marginTop: theme.spacing.unit / 2,
    },
    textField: {},
    button: {},
    rightIcon: {},
    tableContainer: {},
});

interface BBoxInputProps extends WithStyles<typeof styles> {
    show?: boolean;
    onBBoxChange: (selectedBBox: LatLngBounds) => void;
    selectedBBox?: LatLngBounds;
}

interface BBoxInputState {
    west: number|string;
    north: number|string;
    east: number|string;
    south: number|string;
}

const BBoxInput = class extends PureComponent<BBoxInputProps, BBoxInputState> {
    constructor(props: BBoxInputProps) {
        super(props);

        this.state = {
            west: "",
            north: "",
            east: "",
            south: "",
        }
    }

    handleOnChange = () => {
        const {west, south, east, north} = this.state;

        if (west!="" && south != "" && east !="" && north !=""){
            this.props.onBBoxChange(new LatLngBounds(new LatLng(+west, +south), new LatLng(+east, +north)));
        }
    };

    handleSouthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let south = event.target.valueAsNumber;

        if (south) {
            this.setState({...this.state, south})
        }

        //this.handleOnChange();
    };

    handleWestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const west = event.target.valueAsNumber;

        if (west) {
            this.setState({...this.state, west})
        }
    };

    handleNorthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const north = event.target.valueAsNumber;

        if (north) {
            this.setState({...this.state, north})
        }
    };

    handleEastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const east = event.target.valueAsNumber;

        if (east) {
            this.setState({...this.state, east})
        }
    };

    render() {
        const {classes} = this.props;

        if (this.props.selectedBBox){
            this.setState( {
                west: this.props.selectedBBox.getWest(),
                north: this.props.selectedBBox.getNorth(),
                east: this.props.selectedBBox.getEast(),
                south: this.props.selectedBBox.getSouth(),
            });
        }
        else {
            this.setState( {
                west: "",
                north: "",
                east: "",
                south: "",
            });
        }

        return (
            <div>
                <TextField
                    id={'bbox_bottom'}
                    label={'South'}
                    variant={'outlined'}
                    type={"number"}
                    className={classes.searchField}
                    onChange={this.handleSouthChange}
                    value={this.state.south}
                />
                <TextField
                    id={'bbox_left'}
                    label={'West'}
                    variant={'outlined'}
                    type={"number"}
                    className={classes.searchField}
                    onChange={this.handleWestChange}
                    value={this.state.west}
                />
                <TextField
                    id={'bbox_top'}
                    label={'North'}
                    variant={'outlined'}
                    type={"number"}
                    className={classes.searchField}
                    onChange={this.handleNorthChange}
                    value={this.state.north}
                />
                <TextField
                    id={'bbox_right'}
                    label={'East'}
                    variant={'outlined'}
                    type={"number"}
                    className={classes.searchField}
                    onChange={this.handleEastChange}
                    value={this.state.east}
                />
            </div>
        )
    }
};

export default withStyles(styles)(BBoxInput);