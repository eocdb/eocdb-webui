import { PureComponent } from "react";
import * as React from "react";


import { LatLng, LatLngBounds } from "leaflet";
import { TextField, DialogTitle, Dialog, DialogActions, Button, Stack, styled, Paper } from "@mui/material";


export type BBoxValue = [number | string, number | string, number | string, number | string];


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface BBoxInputProps {
    open: boolean;
    onClose: () => void;

    onSouthChange: (south: number | string) => void;
    south: number | string;

    onWestChange: (west: number | string) => void;
    west: number | string;

    onNorthChange: (north: number | string) => void;
    north: number | string;

    onEastChange: (east: number | string) => void;
    east: number | string;

    onBBoxSave: (selectedBounds: LatLngBounds) => void;
}


const BBoxInputDialog = class extends PureComponent<BBoxInputProps> {
    constructor(props: BBoxInputProps) {
        super(props);
    }

    handleOnChange = () => {
        const {north, east, south, west} = this.props;

        this.props.onBBoxSave(new LatLngBounds(new LatLng(+north, +east), new LatLng(+south, +west)));
    };

    handleSouthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const south = event.target.valueAsNumber;
        this.props.onSouthChange(south);
    };

    handleWestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const west = event.target.valueAsNumber;
        this.props.onWestChange(west);
    };

    handleNorthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const north = event.target.valueAsNumber;
        this.props.onNorthChange(north);
    };

    handleEastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const east = event.target.valueAsNumber;
        this.props.onEastChange(east);
    };

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                //TransitionComponent={Transition}
            >
                <div>
                    <DialogTitle id="form-dialog-title">Coordinates</DialogTitle>

                    <Stack direction={'column'} spacing={5}>
                        <Item>
                            <TextField
                                id={'bbox_bottom'}
                                label={'South'}
                                variant={'outlined'}
                                type={"number"}
                                onChange={this.handleSouthChange}
                                defaultValue={this.props.south}
                            />
                        </Item>
                        <Item>
                            <TextField
                                id={'bbox_left'}
                                label={'West'}
                                variant={'outlined'}
                                type={"number"}
                                onChange={this.handleWestChange}
                                defaultValue={this.props.west}
                            />
                        </Item>
                        <Item>
                            <TextField
                                id={'bbox_top'}
                                label={'North'}
                                variant={'outlined'}
                                type={"number"}
                                onChange={this.handleNorthChange}
                                defaultValue={this.props.north}
                            />
                        </Item>
                        <Item>
                            <TextField
                                id={'bbox_right'}
                                label={'East'}
                                variant={'outlined'}
                                type={"number"}
                                onChange={this.handleEastChange}
                                defaultValue={this.props.east}
                            />
                        </Item>
                    </Stack>
                    <DialogActions>
                        <Button
                            onClick={() => this.handleOnChange()}
                            aria-label="Close"
                            variant="contained"
                            color="secondary"
                        >
                            Apply
                        </Button>
                        <Button
                            onClick={this.props.onClose}
                            aria-label="Close"
                            variant="contained"
                            color="secondary"
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        )
    }
};

export default BBoxInputDialog;
