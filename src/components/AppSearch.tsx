import * as React from "react";
import { DateInput } from "@blueprintjs/datetime";
import { Select } from "@blueprintjs/select";
import { InputGroup, Slider, MenuItem, Button, RadioGroup, Radio, Label, Checkbox } from '@blueprintjs/core';
import { SearchField } from "./SearchField";
import { DataTable } from "./DataTable";
import { MeasurementData } from "../types";
import { RegionSelect } from "./RegionSelect";
import { DataType, DataTypeItems } from "./SelectItems";

const DataTypeSelect = Select.ofType<DataType>();

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

    handleTest = () => {
        console.log('Hello');
    };

    renderItem = (dt: DataType) => {
        return (
            <MenuItem key={dt.title} text={dt.title}/>
        );
    };

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

                <DataTypeSelect
                    items={DataTypeItems}
                    itemRenderer={this.renderItem}
                    onItemSelect={this.handleTest}
                >
                    <Button
                        icon="database"
                        rightIcon="caret-down"
                        text={"Select Data Type"}
                    />

                </DataTypeSelect>

                <br/>
                <br/>

                <RadioGroup
                    label="Wavelength Options:"
                    onChange={this.handleTest}
                    inline={true}
                >
                    <Radio label="All" value="All" />
                    <Radio label="Multispectral" value="Multispectral" />
                    <Radio label="Hyperspectral" value="Hyperspectral" />
                </RadioGroup>

                <br/>
                <br/>

                <RadioGroup
                    label="Include Optically Shallow Measurements:"
                    onChange={this.handleTest}
                    inline={true}
                >
                    <Radio label="Yes" value="No" />
                    <Radio label="No" value="No" />
                    <Radio label="Exclusively" value="Exclusively" />
                </RadioGroup>

                <br/>
                <br/>

                <RadioGroup
                    label="Products:"
                    onChange={this.handleTest}
                    inline={false}
                >
                    <Radio label="Find files containing any of the selected products" value="ONe" />
                    <Radio label="Find files where all the specific products entered below were measured in the same cruise" value="Two" />
                    <Radio label="Don't filter based on products" value="Three" />
                </RadioGroup>

                <br/>
                <br/>

                <Label>Grouped Products:</Label>
                <Checkbox inline={true} label="AOP" />
                <Checkbox inline={true} label="PAR" />
                <Checkbox inline={true} label="Kd" />
                <Checkbox inline={true} label="a" />
                <Checkbox inline={true} label="b" />
                <Checkbox inline={true} label="bb" />
                <Checkbox inline={true} label="c" />
                <Checkbox inline={true} label="DC" />
                <Checkbox inline={true} label="PC" />
                <Checkbox inline={true} label="SPM" />
                <Checkbox inline={true} label="AOT" />
                <Checkbox inline={true} label="nutrients" />
                <Checkbox inline={true} label="CTD" />
                <Checkbox inline={true} label="fluoresence" />
                <Checkbox inline={true} label="productivity" />
                <Checkbox inline={true} label="Chl" />
                <Checkbox inline={true} label="HPLC" />

                <br/>
                <br/>

                <RegionSelect id={'map-select-atlantic'}/>

                <br/>
                <br/>
                <DataTable numRows={10}/>
            </div>
        );
    }

}