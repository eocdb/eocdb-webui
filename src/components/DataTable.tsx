import * as React from "react";
import { Column, Table, Cell } from "@blueprintjs/table";
import { SelectionModes } from "../../node_modules/@blueprintjs/table/lib/cjs";
import { MeasurementData } from "../types";
//import { string } from "prop-types";
interface DataTableProps {
    numRows: number;
    data?: MeasurementData;
}

export class DataTable extends React.PureComponent<DataTableProps> {
    cellRendererDollars = (rowIndex: number, columnIndex: number) => {
        let value = "";
        if (this.props.data) {
            value = JSON.stringify(this.props.data);
        }
        return(
            <Cell>{value}</Cell>
        )
    };

    constructor(props: DataTableProps) {
        super(props);
    };

    render() {
        let header = ["empty"];
        let numRows = 1;
        /*if (this.props.data) {
            header = this.props.data[0];
            numRows = 1; //this.props.data.length - 1;
        }*/

        let cols = [];
        for (let col of header) {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            cols.push(<Column key={col} name={col} cellRenderer={this.cellRendererDollars}/>);
        }

        return (
            <Table selectionModes={SelectionModes.ALL} numRows={numRows}>
                {cols}
            </Table>
        );
    };
}