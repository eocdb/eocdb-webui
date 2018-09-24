import * as React from "react";
import { DateInput } from "@blueprintjs/datetime";
import { InputGroup, Slider, Label, Checkbox } from '@blueprintjs/core';
import { SearchField } from "./SearchField";
import { DataTable } from "./DataTable";
import { MeasurementData } from "../types";
import { RegionSelect } from "./RegionSelect";
import SelectInput from "./SelectInput";
import { DataTypeItems, WaveLengthItems, ProductsItems, ShallowItems, ProductGroupItems } from "./SelectInputItems";
import MultiSelectInput from "./MultiSelectInput";


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

                <br/>
                <br/>

                <DateInput parseDate={str => new Date(str)} formatDate={date => date.toLocaleString()}/>
                <DateInput parseDate={str => new Date(str)} formatDate={date => date.toLocaleString()}/>

                <br/>
                <br/>

                <Slider/>
                Minimum (m): <InputGroup/> Maximum (m): <InputGroup/>

                <br/>
                <br/>

                <SelectInput icon={"database"} label={"Data Type:"} items={DataTypeItems} id={'dt-select'}/>

                <br/>
                <br/>

                <SelectInput label={"Wavelength Options:"} items={WaveLengthItems} id={'dt-select'}/>

                <br/>
                <br/>


                <SelectInput label={"Include Optically Shallow Measurements:"} items={ShallowItems} id={'dt-select'}/>

                <br/>
                <br/>

                <SelectInput label={"Products:"} items={ProductsItems} id={'dt-select'}/>

                <br/>
                <br/>

                <MultiSelectInput id={'grouped-products'} items={ProductGroupItems} label={"Grouped Products:"}/>
                <Label>Grouped Products:</Label>
                <Checkbox checked={true} inline={true} label="AOP"/>
                <Checkbox inline={true} label="PAR"/>
                <Checkbox inline={true} label="Kd"/>
                <Checkbox inline={true} label="a"/>
                <Checkbox inline={true} label="b"/>
                <Checkbox inline={true} label="bb"/>
                <Checkbox inline={true} label="c"/>
                <Checkbox inline={true} label="DC"/>
                <Checkbox inline={true} label="PC"/>
                <Checkbox inline={true} label="SPM"/>
                <Checkbox inline={true} label="AOT"/>
                <Checkbox inline={true} label="nutrients"/>
                <Checkbox inline={true} label="CTD"/>
                <Checkbox inline={true} label="fluoresence"/>
                <Checkbox inline={true} label="productivity"/>
                <Checkbox inline={true} label="Chl"/>
                <Checkbox inline={true} label="HPLC"/>

                <br/>
                <br/>

                <RegionSelect id={'map-select-atlantic'}/>

                <br/>
                <br/>
                <DataTable offset={10} start={1}/>
            </div>
        );
    }

}