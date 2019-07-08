import * as React from "react";

import { XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, Label, Legend, Cell } from 'recharts';
import { Dataset } from "../../model";
import { DialogTitle, Theme, WithStyles } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import { PlotRecord, PlotState } from "../../states/dataTableState";
import InputSelect from "./InputSelect";
import { Suggestion } from "./MultipleSelectTextField";
import Grid from "@material-ui/core/Grid";


/*
import {
    Simplify,
} from 'simplify-ts';
*/


const styles = (theme: Theme) => createStyles({
    root: {
        marginLeft: theme.spacing.unit * 2.5,
        zIndex: 99999,
    },
    select: {},
    dialogPaper: {
        zIndex: 99999,
        minHeight: '80%',
        maxHeight: '100%',
        minWidth: '60%',
        maxWidth: '100%',
    },
});


interface PlotDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    onClose: () => void;
    dataset: Dataset;

    updatePlotState: (plotState: PlotState) => void;
    plotState: PlotState;

    updatePlotData: (plotData: PlotRecord[]) => void;
    plotData: PlotRecord[];

    label?: string;
}


const round = (value: number, precision: number) => {
    return Math.round(precision * value) / precision;
};

//const colors = ['red', 'green', 'pink', 'yellow'];

function isNumber(value: string | number): boolean
{
    return ((value != null) && !isNaN(Number(value.toString())));
}


class PlotDialog extends React.Component<PlotDialogProps> {
    constructor(props: PlotDialogProps) {
        super(props);
    }

    updatePlot = (x: number, y: number, z?: number): PlotRecord[] => {
        const records = this.props.dataset.records;
        const precision = 1000000;

        if (z) {
            return records.map((record: number[]) => {
                console.log(record);
                return {
                    x: isNumber(record[x])?round(+record[x], precision):record[x],
                    y: isNumber(record[y])?round(+record[y], precision):record[y],
                    z: isNumber(record[z])?round(+record[z], precision):record[z],
                };
            });
            //return Simplify3D(points, 0.5, false);
        } else {
            let i = 1;
            return records.map((record: number[]) => {
                const xv = isNumber(record[x])?round(+record[x], precision):i;
                const yv = isNumber(record[y])?round(+record[y], precision):i;
                i++;
                return {x: xv, y: yv};
            });
        }
    };


    handleUpdateXField = (field: Suggestion) => {
        const {plotState} = this.props;

        let newPlotState: PlotState = {
            selectedXField: field.value,
            selectedYField: plotState.selectedYField,
            selectedZField: plotState.selectedZField,
        };

        this.props.updatePlotState(newPlotState);
    };

    handleUpdateYField = (field: Suggestion) => {
        const {plotState} = this.props;

        let newPlotState: PlotState = {
            selectedXField: plotState.selectedXField,
            selectedYField: field.value,
            selectedZField: plotState.selectedZField,
        };

        this.props.updatePlotState(newPlotState);
    };

    handleUpdateZField = (field: Suggestion) => {
        const {plotState} = this.props;

        let newPlotState: PlotState = {
            selectedXField: plotState.selectedXField,
            selectedYField: plotState.selectedYField,
            selectedZField: field.value,
        };

        this.props.updatePlotState(newPlotState);
    };


    handleUpdatePlot = () => {
        const {dataset, plotState} = this.props;

        const indexX = dataset.attributes.indexOf(plotState.selectedXField);
        const indexY = dataset.attributes.indexOf(plotState.selectedYField);

        let indexZ: number | undefined = undefined;

        if (plotState.selectedZField !== '') {
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
        const {plotData, classes} = this.props;

        console.log(plotData);

        const {attributes} = this.props.dataset;

        const selectItems = attributes.map((attribute: string) => {
            return {value: attribute, label: attribute}
        });

        const {selectedXField, selectedYField, selectedZField} = this.props.plotState;


        return (
            <div className={classes.root}>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    classes={{paper: classes.dialogPaper}}
                >
                    <DialogTitle id="form-dialog-title">Plot</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={8} direction={"row"}>
                            <InputSelect
                                items={selectItems}
                                selectedItem={{label: selectedXField, value: selectedXField}}
                                onChange={this.handleUpdateXField}
                                placeholder={'X...'}
                                label={'X'}
                            />
                            <InputSelect
                                items={selectItems}
                                selectedItem={{label: selectedYField, value: selectedYField}}
                                onChange={this.handleUpdateYField}
                                placeholder={'Y...'}
                                label={'Y1'}
                            />
                            <InputSelect
                                items={selectItems}
                                selectedItem={{label: selectedZField, value: selectedZField}}
                                onChange={this.handleUpdateZField}
                                placeholder={'Z...'}
                                label={'Y2'}
                            />

                            <Button onClick={this.handleUpdatePlot} color="secondary">
                                Plot
                            </Button>
                        </Grid>
                        <Grid container spacing={8} direction={"row"}>
                            <ScatterChart width={700} height={500}
                                          margin={{top: 50, right: 50, bottom: 50, left: 50}}
                                          data={plotData}
                            >
                                <XAxis scale={"auto"} dataKey={"x"} type={"number"} domain={['dataMin', 'dataMax']}>
                                    <Label value={selectedXField} dy={20} position={"right"}/>
                                </XAxis>
                                <YAxis yAxisId="left" dataKey={"y"} type={"number"} domain={['dataMin', 'dataMax']}/>
                                <YAxis yAxisId="right"
                                       type="number"
                                       dataKey={"z"}
                                       name={selectedZField}
                                       domain={['dataMin', 'dataMax']}
                                       orientation="right"
                                       stroke="#82ca9d"/>
                                <CartesianGrid/>
                                <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                                <Scatter yAxisId="left" name={selectedYField} data={plotData} fill={'#8884d8'}/>
                                <Scatter yAxisId="right" name={selectedZField} data={plotData} fill="#82ca9d">
                                    {
                                        plotData.map((entry, index) => {
                                            // fill={colors[index % colors.length]}
                                            return <Cell key={`cell-${index}`}  />
                                        })
                                    }
                                </Scatter>
                                {this.props.plotData.length > 0 ?
                                    (<Legend verticalAlign={"top"} height={36}/>) :
                                    ''
                                }
                            </ScatterChart>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default withStyles(styles)(PlotDialog);