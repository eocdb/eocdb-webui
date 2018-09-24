import * as React from 'react';
import { Select, ItemRenderer, ItemPredicate } from "@blueprintjs/select";
import { ISelectInput } from "./SelectInputItems";
import { Button, MenuItem, IconName } from "@blueprintjs/core";
import { highlightText } from "./utils";


const SelectInputCore = Select.ofType<ISelectInput>();


interface SelectInputProps {
    id: string;
    items: ISelectInput[];
    label: string;
    icon?: IconName;
}


interface SelectInputState {
    selectedItem: ISelectInput | undefined;
}


class SelectInput extends React.PureComponent<SelectInputProps, SelectInputState> {
    constructor(props: SelectInputProps) {
        super(props);

        this.state = {
            selectedItem: undefined,
        };
    }


    handleItemSelect = (item: ISelectInput) => {
        this.setState({selectedItem: item})
    };

    renderFilm: ItemRenderer<ISelectInput> = (dt, {handleClick, modifiers, query}) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }
        const text = dt.label;

        return (
            <MenuItem key={dt.value} text={highlightText(text, query)} onClick={handleClick}/>
        );
    };

    filterDataType: ItemPredicate<ISelectInput> = (query: string, dt: ISelectInput) => {
        return dt.value.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    };

    render() {
        const data_type = this.state.selectedItem;

        return (
            <SelectInputCore
                items={this.props.items}
                itemRenderer={this.renderFilm}
                itemPredicate={this.filterDataType}
                onItemSelect={this.handleItemSelect}
                noResults={<MenuItem disabled={true} text="No results."/>}
            >
                <Button
                    icon={this.props.icon}
                    rightIcon="caret-down"
                    text={data_type ? data_type.label : this.props.label}
                />

            </SelectInputCore>
        );
    }
}


export default SelectInput;