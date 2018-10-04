import * as React from 'react';
import { MultiSelect, ItemRenderer, ItemPredicate } from "@blueprintjs/select";
import { ISelectInput } from "./SelectInputItems";
import { MenuItem } from "@blueprintjs/core";


const MultiSelectInputCore = MultiSelect.ofType<ISelectInput>();


interface MultiSelectInputProps {
    id: string;
    items: ISelectInput[],
    label: string,
}


interface MultiSelectInputState {
    selectedItems: ISelectInput[];
}


class MultiSelectInput extends React.PureComponent<MultiSelectInputProps, MultiSelectInputState> {
    constructor(props: MultiSelectInputProps) {
        super(props);

        this.state = {
            selectedItems: [],
        };
    }

    selectItem(item: ISelectInput) {
        this.setState({selectedItems: [...this.state.selectedItems, item]});
    };

    deselectItem(index: number) {
        this.setState({selectedItems: this.state.selectedItems.filter((_item, i) => i !== index)});
    };

    getSelectedItemIndex(item: ISelectInput) {
        return this.state.selectedItems.indexOf(item);
    };

    isItemSelected(item: ISelectInput) {
        return this.getSelectedItemIndex(item) !== -1;
    };

    handleItemSelect = (item: ISelectInput) => {
        if (!this.isItemSelected(item)) {
            this.selectItem(item);
        } else {
            this.deselectItem(this.getSelectedItemIndex(item));
        }
    };

    renderItem: ItemRenderer<ISelectInput> = (item, {modifiers, handleClick}) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }
        return (
            <MenuItem
                active={modifiers.active}
                icon={this.isItemSelected(item) ? "tick" : "blank"}
                key={item.value}
                onClick={handleClick}
                text={item.label}
                shouldDismissPopover={false}
            />
        );
    };

    filterDataType: ItemPredicate<ISelectInput> = (query: string, dt: ISelectInput) => {
        return dt.value.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    };

    renderTag = (item: ISelectInput) => item.label;

    render() {
        return (
            <div>
                <MultiSelectInputCore
                    items={this.props.items}
                    itemRenderer={this.renderItem}
                    itemPredicate={this.filterDataType}
                    onItemSelect={this.handleItemSelect}
                    tagRenderer={this.renderTag}
                    selectedItems={this.state.selectedItems}
                />
                <br/>
                <br/>
            </div>
        );
    }
}


export default MultiSelectInput;