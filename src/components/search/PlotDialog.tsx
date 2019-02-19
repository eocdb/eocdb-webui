import * as React from "react";

import { XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, Label, ZAxis } from 'recharts';
import { Dataset } from "../../types/dataset";
import { DialogTitle, Theme, WithStyles } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import SimpleSelect from "./SimpleSelect";
import { PlotRecord, PlotState } from "../../states/dataTableState";

/*
import {
    Simplify,
    ISimplifyObjectPoint
} from 'simplify-ts';
*/


const styles = (theme: Theme) => createStyles({
    root: {
        marginLeft: theme.spacing.unit * 2.5,
    },
    select: {

    }
});


interface PlotDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    onClose: () => void;
    dataset: Dataset;

    updatePlotState: (plotState: PlotState) => void;
    plotState: PlotState;

    updatePlotData: (plotData: PlotRecord[]) => void;
    plotData: PlotRecord[];
}


//const colors = ['red', 'green', 'pink', 'yellow'];

class PlotDialog extends React.Component<PlotDialogProps> {
    constructor(props: PlotDialogProps) {
        super(props);
    }

    updatePlot = (x: number, y: number, z?: number): PlotRecord[] => {
        const records = this.props.dataset.records;

        if (z) {
            return records.map((record: number[]) => {
                let z = 0;
                if(!record[z]) {
                    z = 0;
                }
                return {x: record[x], y: record[y], z: z};
            });
            //return Simplify3D(points, 0.5, false);
        } else {
            return records.map((record: number[])  => {
                return {x: record[x], y: record[y]};
            });

            //return Simplify(points, 0.5, false);
        }
    };


    handleUpdateXField = (field: string) => {
        const {plotState} = this.props;

        let newPlotState: PlotState = {
            selectedXField: field,
            selectedYField: plotState.selectedYField,
            selectedZField: plotState.selectedZField,
        };

        this.props.updatePlotState(newPlotState);
    };

    handleUpdateYField = (field: string) => {
        const {plotState} = this.props;

        let newPlotState: PlotState = {
            selectedXField: plotState.selectedXField,
            selectedYField: field,
            selectedZField: plotState.selectedZField,
        };

        this.props.updatePlotState(newPlotState);
    };

    handleUpdateZField = (field: string) => {
        const {plotState} = this.props;

        let newPlotState: PlotState = {
            selectedXField: plotState.selectedXField,
            selectedYField: plotState.selectedYField,
            selectedZField: field,
        };

        this.props.updatePlotState(newPlotState);
    };


    handleUpdatePlot = () => {
        const {dataset, plotState} = this.props;

        const indexX = dataset.attributes.indexOf(plotState.selectedXField);
        const indexY = dataset.attributes.indexOf(plotState.selectedYField);

        let indexZ: number|undefined = undefined;

        if(plotState.selectedZField !== '') {
            indexZ = dataset.attributes.indexOf(plotState.selectedZField);
        }

        const plotData = this.updatePlot(indexX, indexY, indexZ);

        this.props.updatePlotData(plotData);
    };

    handleClose = () => {
        const newPlotState: PlotState = {
            selectedXField: '',
            selectedYField: '',
            selectedZField: '',
        };

        this.props.updatePlotState(newPlotState);

        this.props.updatePlotData([]);

        this.props.onClose();
    };

    render() {
        const data = this.props.plotData;

        const {attributes} = this.props.dataset;

        const fieldItems = attributes.map( (attribute: string) => {
            return {key: attribute, label: attribute}
        });

        const {selectedXField, selectedYField, selectedZField} = this.props.plotState;
        //const plotData = this.props.plotData;

        return (
            <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Settings</DialogTitle>
                <DialogContent>
                    <SimpleSelect
                        name={'X'}
                        items={fieldItems}
                        selectedItem={this.props.plotState.selectedXField}
                        onChange={this.handleUpdateXField}
                    />
                    <SimpleSelect
                        name={'Y'}
                        items={fieldItems}
                        selectedItem={this.props.plotState.selectedYField}
                        onChange={this.handleUpdateYField}
                    />
                    <SimpleSelect
                        name={'Z'}
                        items={fieldItems}
                        selectedItem={this.props.plotState.selectedZField}
                        onChange={this.handleUpdateZField}
                    />
                    <Button onClick={this.handleUpdatePlot} color="secondary">
                        Plot
                    </Button>
                    <ScatterChart width={700} height={500}
                                  margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                        <XAxis dataKey={"x"}  domain={['dataMin', 'dataMax']}>
                            <Label value={selectedXField} position="bottom" offset={0}/>
                        </XAxis>
                        <YAxis dataKey={"y"} type={"number"} domain={['dataMin', 'dataMax']}>
                            <Label angle={-90} value={selectedYField} position="insideLeft" offset={0}/>
                        </YAxis>
                        <ZAxis range={[60, 400]} dataKey={"z"} name={selectedZField} />
                        <CartesianGrid/>
                        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                        <Scatter name={'test'} shape={"star"}  data={data} fill={'#8884d8'}/>
                    </ScatterChart>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


export default withStyles(styles)(PlotDialog);