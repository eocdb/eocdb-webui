import { PureComponent } from "react";
import TextField from "@material-ui/core/TextField/TextField";
import * as React from "react";
import { Theme, withStyles, WithStyles } from "@material-ui/core";
import { LatLng, latLngBounds, LatLngBounds } from 'leaflet';

import createStyles from "@material-ui/core/styles/createStyles";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) =>  createStyles({
    searchField: {
        width: 300,
    },
    textField: {},
    button: {},
    rightIcon: {},
    tableContainer: {},
});

interface BBoxInputProps extends WithStyles<typeof styles>{
    onBBoxChange: (selectedBounds: LatLngBounds) => void;
    selectedBounds: LatLngBounds;
}


class BBoxInput extends PureComponent<BBoxInputProps> {
    constructor(props: BBoxInputProps) {
        super(props);
    }

    createNewBBox = (south: number, west: number, north: number, east: number) => {
        const newSouthWest = new LatLng(south, west);
        const newNorthEast = new LatLng(north, east);
        return latLngBounds(newSouthWest, newNorthEast);
    };

    handleSouthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let south = event.target.valueAsNumber;
        const {selectedBounds} = this.props;

        if(!south) {
            south = 0;
        }
        else if(south > selectedBounds.getNorth()){
            south = selectedBounds.getNorth();
        }

        const newBBox = this.createNewBBox(
            south,
            selectedBounds.getWest(),
            selectedBounds.getNorth(),
            selectedBounds.getEast()
        );
        this.props.onBBoxChange(newBBox);
    };

    handleWestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const west = event.target.valueAsNumber;

        const {selectedBounds} = this.props;

        const newBBox = this.createNewBBox(
            selectedBounds.getSouth(),
            west,
            selectedBounds.getNorth(),
            selectedBounds.getEast()
        );

        this.props.onBBoxChange(newBBox);
    };

    handleNorthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const north = event.target.valueAsNumber;
        const {selectedBounds} = this.props;

        const newBBox = this.createNewBBox(
            selectedBounds.getSouth(),
            selectedBounds.getWest(),
            north,
            selectedBounds.getEast()
        );
        this.props.onBBoxChange(newBBox);
    };

    handleEastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const east = event.target.valueAsNumber;
        const {selectedBounds} = this.props;

        const newBBox = this.createNewBBox(
            selectedBounds.getSouth(),
            selectedBounds.getWest(),
            selectedBounds.getNorth(),
            east
        );
        this.props.onBBoxChange(newBBox);
    };

    render() {
        const { classes, selectedBounds } = this.props;
        return (
            <div>
                <TextField
                    id={'bbox_bottom'}
                    label={'South'}
                    variant={'outlined'}
                    type={"number"}
                    className={classes.searchField}
                    onChange={this.handleSouthChange}
                    value={selectedBounds.getSouth()}
                />
                <TextField
                    id={'bbox_left'}
                    label={'West'}
                    variant={'outlined'}
                    type={"number"}
                    className={classes.searchField}
                    onChange={this.handleWestChange}
                    value={selectedBounds.getWest()}
                />
                <TextField
                    id={'bbox_top'}
                    label={'North'}
                    variant={'outlined'}
                    type={"number"}
                    className={classes.searchField}
                    onChange={this.handleNorthChange}
                    value={selectedBounds.getNorth()}
                />
                <TextField
                    id={'bbox_right'}
                    label={'East'}
                    variant={'outlined'}
                    type={"number"}
                    className={classes.searchField}
                    onChange={this.handleEastChange}
                    value={selectedBounds.getEast()}
                />
            </div>
        )
    }
}

export default withStyles(styles)(BBoxInput);