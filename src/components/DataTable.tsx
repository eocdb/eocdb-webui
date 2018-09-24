import * as React from "react";
import { Column, Table, Cell } from "@blueprintjs/table";
import { MeasurementData } from "../types";
import { TablePaginationActions } from "./TablePaginationActions";


interface DataTableProps {
    data?: MeasurementData;
    offset: number;
    start: number;
}


export class DataTable extends React.PureComponent<DataTableProps> {
    //hasPagination: boolean = false;

    //cellRendererDollars = (rowIndex: number, columnIndex: number) => {
    cellRenderer = () => {
        let value = "";
        if (this.props.data) {
            value = JSON.stringify(this.props.data);
        }
        return (
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
            cols.push(<Column key={col} name={col} cellRenderer={this.cellRenderer}/>);
        }

        return (
            <div>
                <Table numRows={numRows}>
                    {cols}
                </Table>

                <TablePaginationActions id={'tt'}/>
            </div>
        );
    };
}