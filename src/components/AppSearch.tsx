import * as React from "react";
import { SearchField } from "./SearchField";
import { DataTable } from "./DataTable";
import { MeasurementData } from "../types";


interface AppSearchProps {
    id: string;
    queryString: string;
    data?: MeasurementData;
    onQueryStringChange: (queryString: string) => void;
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
                < br/>
                < br/>
                < DataTable
                    numRows={100}
                    data={this.props.data}
                />
            </div>
        );
    }
}