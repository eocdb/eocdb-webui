import * as React from "react";

import { XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, Label, ZAxis, Cell } from 'recharts';
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


const styles = (theme: Theme) => createStyles({
    root: {
        marginLeft: theme.spacing.unit * 2.5,
    },
    select: {

    }
});


interface PlotDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    handleClose: () => void;
    dataset: Dataset;

    updatePlotState: (plotState: PlotState) => void;
    plotState: PlotState;
}


const colors = ['red', 'green', 'pink', 'yellow'];

class PlotDialog extends React.Component<PlotDialogProps> {
    constructor(props: PlotDialogProps) {
        super(props);
    }

    updatePlot = (x: number, y: number, z: number | null): PlotRecord[] => {
        const records = this.props.dataset.records;

        if (z !== null) {
            return records.map((record: any) => {
                return {x: record[x], y: record[y], z: record[z]};
            });
        } else {
            return records.map((record: any) => {
                return {x: record[x], y: record[y], z: null};
            });
        }
    };


    handleUpdateXField = (field: string) => {
        const {plotState} = this.props;

        let newPlotState: PlotState = {
            selectedXField: field,
            selectedYField: plotState.selectedYField,
            selectedZField: plotState.selectedZField,
            plotRecords: plotState.plotRecords,
        };

        this.props.updatePlotState(newPlotState);
    };

    handleUpdateYField = (field: string) => {
        const {plotState} = this.props;

        let newPlotState: PlotState = {
            selectedXField: plotState.selectedXField,
            selectedYField: field,
            selectedZField: plotState.selectedZField,
            plotRecords: plotState.plotRecords,
        };

        this.props.updatePlotState(newPlotState);
    };

    handleUpdateZField = (field: string) => {
        const {plotState} = this.props;

        let newPlotState: PlotState = {
            selectedXField: plotState.selectedZField,
            selectedYField: plotState.selectedYField,
            selectedZField: field,
            plotRecords: plotState.plotRecords,
        };

        this.props.updatePlotState(newPlotState);
    };


    handleUpdatePlot = () => {
        const {dataset, plotState} = this.props;

        const indexX = dataset.attributes.indexOf(plotState.selectedXField);
        const indexY = dataset.attributes.indexOf(plotState.selectedYField);
        const indexZ = dataset.attributes.indexOf(plotState.selectedZField);

        const plotData = this.updatePlot(indexX, indexY, indexZ);

        let newPlotState: PlotState = {
            selectedXField: plotState.selectedZField,
            selectedYField: plotState.selectedYField,
            selectedZField: plotState.selectedZField,
            plotRecords: plotData,
        };

        this.props.updatePlotState(newPlotState);
    };

    render() {
        const data = this.updatePlot(0, 1, 2);

        const {attributes} = this.props.dataset;

        const fieldItems = attributes.map( (attribute: string) => {
            return {key: attribute, label: attribute}
        });

        const {selectedXField, selectedYField, selectedZField, plotRecords} = this.props.plotState;

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
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
                        <XAxis dataKey={"x"}>
                            <Label value={selectedXField} position="bottom" offset={0}/>
                        </XAxis>
                        <YAxis dataKey={"y"}>
                            <Label angle={-90} value={selectedYField} position="insideLeft" offset={0}/>
                        </YAxis>
                        <ZAxis dataKey={"z"} name={selectedZField}/>
                        <CartesianGrid/>
                        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                        <Scatter name={'test'} data={data} fill={'#8884d8'}>
                            {plotRecords.map((entry, index) => {
                                return <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                            })}
                        </Scatter>
                    </ScatterChart>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


export default withStyles(styles)(PlotDialog);