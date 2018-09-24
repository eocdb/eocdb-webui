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

    selectFilm(item: ISelectInput) {
        this.setState({ selectedItems: [...this.state.selectedItems, item] });
    };

    deselectFilm(index: number) {
        this.setState({ selectedItems: this.state.selectedItems.filter((_item, i) => i !== index) });
    };

    getSelectedFilmIndex(item: ISelectInput) {
        return this.state.selectedItems.indexOf(item);
    };

    isFilmSelected(item: ISelectInput) {
        return this.getSelectedFilmIndex(item) !== -1;
    };

    handleItemSelect = (item: ISelectInput) => {
        if (!this.isFilmSelected(item)) {
            this.selectFilm(item);
        } else {
            this.deselectFilm(this.getSelectedFilmIndex(item));
        }
    };

    renderFilm: ItemRenderer<ISelectInput> = (item, { modifiers, handleClick }) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }
        return (
            <MenuItem
                active={modifiers.active}
                icon={this.isFilmSelected(item) ? "tick" : "blank"}
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
            <MultiSelectInputCore
                items={this.props.items}
                itemRenderer={this.renderFilm}
                itemPredicate={this.filterDataType}
                onItemSelect={this.handleItemSelect}
                tagRenderer={this.renderTag}
            />
        );
    }
}


export default MultiSelectInput;