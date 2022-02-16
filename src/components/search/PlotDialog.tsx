import * as React from "react";

import { XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, Label, Legend, Cell } from 'recharts';
import { Dataset } from "../../model";
import { PlotRecord, PlotState } from "../../states/dataTableState";
import { Suggestion } from "./MultipleSelectTextField";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Select from "react-select";


interface PlotDialogProps {
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

function isNumber(value: string | number): boolean {
    return ((value != null) && !isNaN(Number(value.toString())));
}


export default function PlotDialog(props: PlotDialogProps) {
    const {dataset, plotData, plotState} = props;
    const {selectedXField, selectedYField, selectedZField} = props.plotState;
    const {attributes} = dataset;

    const updatePlot = (x: number, y: number, z?: number): PlotRecord[] => {
        const records = props.dataset.records;
        const precision = 1000000;

        if (z) {
            return records.map((record: number[]) => {
                let xv: number | null = isNumber(record[x]) ? round(+record[x], precision) : record[x];
                let yv: number | null = isNumber(record[y]) ? round(+record[y], precision) : record[y];
                let zv: number | null = isNumber(record[z]) ? round(+record[z], precision) : record[z];

                if (props.dataset.metadata['missing']) {
                    xv = xv == props.dataset.metadata['missing'] ? null : xv;
                    yv = yv == props.dataset.metadata['missing'] ? null : yv;
                    zv = yv == props.dataset.metadata['missing'] ? null : zv;
                }

                return {
                    x: xv,
                    y: yv,
                    z: zv,
                };
            });
        } else {
            let i = 1;
            return records.map((record: number[]) => {
                let xv: number | null = isNumber(record[x]) ? round(+record[x], precision) : i;
                let yv: number | null = isNumber(record[y]) ? round(+record[y], precision) : i;
                i++;

                if (props.dataset.metadata['missing']) {
                    xv = xv == props.dataset.metadata['missing'] ? null : xv;
                    yv = yv == props.dataset.metadata['missing'] ? null : yv;
                }
                return {x: xv, y: yv};
            });
        }
    };


    const handleUpdateXField = (field: Suggestion) => {
        let newPlotState: PlotState = {
            selectedXField: field.value,
            selectedYField: plotState.selectedYField,
            selectedZField: plotState.selectedZField,
        };

        props.updatePlotState(newPlotState);
    };

    const handleUpdateYField = (field: Suggestion) => {
        let newPlotState: PlotState = {
            selectedXField: plotState.selectedXField,
            selectedYField: field.value,
            selectedZField: plotState.selectedZField,
        };

        props.updatePlotState(newPlotState);
    };

    const handleUpdateZField = (field: Suggestion) => {
        let newPlotState: PlotState = {
            selectedXField: plotState.selectedXField,
            selectedYField: plotState.selectedYField,
            selectedZField: field.value,
        };

        this.props.updatePlotState(newPlotState);
    };

    const handleUpdatePlot = () => {
        const indexX = dataset.attributes.indexOf(plotState.selectedXField);
        const indexY = dataset.attributes.indexOf(plotState.selectedYField);

        let indexZ: number | undefined = undefined;

        if (plotState.selectedZField !== '') {
            indexZ = dataset.attributes.indexOf(plotState.selectedZField);
        }

        const plotData = updatePlot(indexX, indexY, indexZ);

        props.updatePlotData(plotData);
    };

    const handleClose = () => {
        const newPlotState: PlotState = {
            selectedXField: '',
            selectedYField: '',
            selectedZField: '',
        };

        props.updatePlotState(newPlotState);

        props.updatePlotData([]);

        props.onClose();
    };

    const getY2Plot = (selectedZField: string, plotData: PlotRecord[]) => {
        if(selectedZField == ''){
            return null;
        }
        else{
            return (
                <Scatter yAxisId="right" name={selectedZField} data={plotData} fill={'#82ca9d'}>
                    {
                        plotData.map((entry, index) => {
                            // fill={colors[index % colors.length]}
                            return <Cell key={`cell-${index}`}/>
                        })
                    }
                </Scatter>
            );
        }
    };

    const selectItems = attributes.map((attribute: string) => {
        return {value: attribute, label: attribute}
    });

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Plot</DialogTitle>
            <DialogContent>
                    <Select
                        value={{label: selectedXField, value: selectedXField}}
                        options={selectItems}
                        onChange={handleUpdateXField}
                        placeholder={'X...'}
                    />
                    <Select
                        value={{label: selectedYField, value: selectedYField}}
                        options={selectItems}
                        onChange={handleUpdateYField}
                        placeholder={'Y...'}
                    />
                    <Select
                        value={{label: selectedZField, value: selectedZField}}
                        options={selectItems}
                        onChange={handleUpdateZField}
                        placeholder={'Y2...'}
                    />
                    <Button onClick={handleUpdatePlot} color="secondary">
                        Plot
                    </Button>
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

                        {getY2Plot(selectedZField, plotData)}
                        {props.plotData.length > 0 ?
                            (<Legend verticalAlign={"top"} height={36}/>) :
                            ''
                        }
                    </ScatterChart>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

