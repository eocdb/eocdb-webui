import { PureComponent } from "react";
import TextField from "@material-ui/core/TextField/TextField";
import * as React from "react";
import { Theme, withStyles, WithStyles } from "@material-ui/core";


import createStyles from "@material-ui/core/styles/createStyles";

export type BBoxValue = [number|undefined, number|undefined, number|undefined, number|undefined];


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) =>  createStyles({
    searchField: {
        width: 300,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    textField: {},
    button: {},
    rightIcon: {},
    tableContainer: {},
});

interface BBoxInputProps extends WithStyles<typeof styles>{
    onBBoxChange: (selectedBBox: BBoxValue) => void;
    selectedBBox: BBoxValue;
}


class BBoxInput extends PureComponent<BBoxInputProps> {
    constructor(props: BBoxInputProps) {
        super(props);
    }


    handleSouthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let south = event.target.valueAsNumber;
        const {selectedBBox} = this.props;

        const newBBox: BBoxValue = [
            south,
            selectedBBox[1],
            selectedBBox[2],
            selectedBBox[3],
        ];

        this.props.onBBoxChange(newBBox);
    };

    handleWestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const west = event.target.valueAsNumber;

        const {selectedBBox} = this.props;

        const newBBox: BBoxValue = [
            selectedBBox[0],
            west,
            selectedBBox[2],
            selectedBBox[3],
        ];
        this.props.onBBoxChange(newBBox);
    };

    handleNorthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const north = event.target.valueAsNumber;
        const {selectedBBox} = this.props;

        const newBBox: BBoxValue = [
            selectedBBox[0],
            selectedBBox[1],
            north,
            selectedBBox[3],
        ];

        this.props.onBBoxChange(newBBox);
    };

    handleEastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const east = event.target.valueAsNumber;
        const {selectedBBox} = this.props;

        const newBBox: BBoxValue = [
            selectedBBox[0],
            selectedBBox[1],
            selectedBBox[2],
            east,
        ];

        this.props.onBBoxChange(newBBox);
    };

    render() {
        const { classes, selectedBBox } = this.props;
        return (
            <div>
                <TextField
                    id={'bbox_bottom'}
                    label={'South'}
                    variant={'outlined'}
                    type={"number"}
                    className={classes.searchField}
                    onChange={this.handleSouthChange}
                    value={selectedBBox[0]}
                />
                <TextField
                    id={'bbox_left'}
                    label={'West'}
                    variant={'outlined'}
                    type={"number"}
                    className={classes.searchField}
                    onChange={this.handleWestChange}
                    value={selectedBBox[1]}
                />
                <TextField
                    id={'bbox_top'}
                    label={'North'}
                    variant={'outlined'}
                    type={"number"}
                    className={classes.searchField}
                    onChange={this.handleNorthChange}
                    value={selectedBBox[2]}
                />
                <TextField
                    id={'bbox_right'}
                    label={'East'}
                    variant={'outlined'}
                    type={"number"}
                    className={classes.searchField}
                    onChange={this.handleEastChange}
                    value={selectedBBox[3]}
                />
            </div>
        )
    }
}

export default withStyles(styles)(BBoxInput);