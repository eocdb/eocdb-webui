import * as React from "react";
import { Column, Table, Cell } from "@blueprintjs/table";

interface DataTableProps {
    numRows: number;
}

export class DataTable extends React.PureComponent<DataTableProps> {
    cellRendererDollars = (rowIndex: number) => <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>;
    //cellRendererFun = (rowIndex: number) => <Cell>{`$${(rowIndex * 20).toFixed(2)}`}</Cell>;

    constructor(props: DataTableProps) {
        super(props);
    };

    render() {
        let cols = [];
        for (let i = 0; i < 5; i++) {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            cols.push(<Column key={i} name={"Dollars Column " + i} cellRenderer={this.cellRendererDollars}/>);
        }

        return (
            <Table numRows={this.props.numRows}>
                {cols}
            </Table>
        );
    };
}