import * as React from "react";
import { SearchField } from "./SearchField";
import { DataTable } from "./DataTable";
import { MeasurementData } from "../types";
import { DataTablePaginationActions } from "./TablePaginationActions";


interface AppSearchProps {
    id: string;
    queryString: string;
    data?: MeasurementData;
    onQueryStringChange: (queryString: string) => void;
    onPageChange: (start: number, offset: number) => void;
}


export class AppSearch extends React.PureComponent<AppSearchProps> {
    constructor(props: AppSearchProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <SearchField queryString={this.props.queryString}
                             onQueryStringChange={this.props.onQueryStringChange}/>

                <br/>
                <br/>

                <DataTable data={this.props.data} />
                <DataTablePaginationActions max={1000} id={'tt'} handleOnChange={this.props.onPageChange}/>
            </div>
        );
    }

}