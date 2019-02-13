import * as React from "react";

import { XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter, Label, ZAxis, Cell } from 'recharts';
import { Dataset } from "../../types/dataset";
import { DialogTitle } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";


interface PlotDialogProps {
    open: boolean;
    handleClose: () => void;
    dataset: Dataset;
}

const colors = ['red', 'green', 'pink', 'yellow'];

class PlotDialog extends React.Component<PlotDialogProps> {
    constructor(props: PlotDialogProps) {
        super(props);
    }

    updatePlot = (x: number, y: number, z: number | null) => {
        const records = this.props.dataset.records;

        if (z !== null) {
            return records.map((record: any) => {
                return {x: record[x], y: record[y], z: record[z]};
            });
        } else {
            return records.map((record: any) => {
                return {x: record[x], y: record[y]};
            });
        }
    };

    render() {
        const data = this.updatePlot(0, 1, 2);

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Settings</DialogTitle>
                <DialogContent>
                    <ScatterChart width={700} height={500}
                                  margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                        <XAxis dataKey={"x"}>
                            <Label value="LBs" position="bottom" offset={0}/>
                        </XAxis>
                        <YAxis dataKey={"y"}>
                            <Label angle={-90} value="LBs" position="insideLeft" offset={0}/>
                        </YAxis>
                        <ZAxis dataKey={"z"} name={'z'}/>
                        <CartesianGrid/>
                        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                        <Scatter name={'test'} data={data} fill={'#8884d8'}>
                            {data.map((entry, index) => {
                                return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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


export default (PlotDialog)