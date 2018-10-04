import * as React from "react";
import { SearchField } from "./SearchField";
import { DataTable } from "./DataTable";
import { GeoRectangle, MeasurementData } from "../types";
import { DataTablePaginationActions } from "./DataTablePaginationActions";
import { OL } from "./RegionSelect";
import MultiSelectInput from "./MultiSelectInput";
import { DataTypeItems } from "./SelectInputItems";


interface AppSearchProps {
    id: string;
    queryString: string;
    data?: MeasurementData;
    onQueryStringChange: (queryString: string) => void;
    onPageChange: (start: number, offset: number) => void;
    onRegionChange: (rectangle: GeoRectangle) => void;
}


interface AppSearchState {
    searchSuccess: boolean;
}


export class AppSearch extends React.PureComponent<AppSearchProps, AppSearchState> {
    constructor(props: AppSearchProps) {
        super(props);

        this.state = {
            searchSuccess: false,
        };
    }

    handleSearchSuccess = (success: boolean) => {
        this.setState({searchSuccess: success});
    };

    render() {
        if(this.state.searchSuccess){
            return(
                <div>
                    <DataTable data={this.props.data}/>
                    <DataTablePaginationActions
                        max={1000} id={'tt'}
                        handleOnChange={this.props.onPageChange}
                        handleOnSearchSuccess={this.handleSearchSuccess}
                    />
                </div>
            );
        }
        else {
            return (
                <div>
                    <SearchField queryString={this.props.queryString}
                                 onQueryStringChange={this.props.onQueryStringChange}
                                 onSearchSuccess={this.handleSearchSuccess}
                    />


                    <OL
                        onRegionChange={this.props.onRegionChange}
                        onSearchSuccess={this.handleSearchSuccess}
                        id={'region-select'}
                    />

                    <MultiSelectInput id={'select'} label={'Grouped Products'} items={DataTypeItems}/>
                </div>
            );
        }
    }

}