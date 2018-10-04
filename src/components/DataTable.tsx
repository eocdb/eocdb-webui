import * as React from "react";
import { Column, Table, Cell } from "@blueprintjs/table";
import { MeasurementData } from "../types";
import { ISelectInput } from "./SelectInputItems";


interface DataTableProps {
    data?: MeasurementData;
    selectedOffsetItem?: ISelectInput | undefined;
}


export class DataTable extends React.PureComponent<DataTableProps> {
    //hasPagination: boolean = false;

    cellRenderer = (rowIndex: number, columnIndex: number) => {
        let value = '';

        if (this.props.data) {
            try {
                value = JSON.stringify(this.props.data[0]['records'][rowIndex][columnIndex]);
            }
            catch (e) {

            }
        }

        return (
            <Cell>{value}</Cell>
        )
    };

    constructor(props: DataTableProps) {
        super(props);
    };

    render() {
        let header = ['empty'];

        try {
            if (this.props.data) {
                header = this.props.data[0]['attributes'];
            }
        }
        catch (e) {

        }

        let numRows = 1;
        try {
            if (this.props.data) {
                numRows = this.props.data[0]['records'].length - 1;
            }
        }
        catch (e) {

        }

        let cols = [];
        for (let col of header) {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            cols.push(<Column key={col} name={col} cellRenderer={this.cellRenderer}/>);
        }

        return (
            <Table numRows={numRows}>
                {cols}
            </Table>
        );
    };
}