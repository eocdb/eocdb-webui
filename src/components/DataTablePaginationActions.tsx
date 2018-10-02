import * as React from "react";
import { Button, Text } from '@blueprintjs/core';
import SelectInput from './SelectInput'
import { ISelectInput } from "./SelectInputItems";


interface DataTablePaginationActionsProps {
    id: string;
    max: number;
    handleOnChange: (start: number, offset: number) => void;
    handleOnSearchSuccess: (success: boolean) => void;
}


interface DataTablePaginationActionsState {
    selectedOffset: ISelectInput|undefined;
    offset: number;
    start: number;
}


const ITEMS: ISelectInput[] = [
    {label: '10', value: '10'},
    {label: '50', value: '50'},
    {label: '100', value: '100'},
];


export class DataTablePaginationActions extends React.PureComponent<DataTablePaginationActionsProps, DataTablePaginationActionsState> {
    constructor(props: DataTablePaginationActionsProps) {
        super(props);

        this.state = {
            selectedOffset: {label: '10', value: '10'},
            offset: 10,
            start: 1,
        };
    }

    handleBack = () => {
        this.props.handleOnSearchSuccess(false);
    };

    handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
        const action = (event.target as HTMLButtonElement).value;

        let start = this.state.start;
        const offset = this.state.offset;

        switch (action) {
            case 'left':
                if(start > offset ) {
                    start -= offset;
                }
                break;
            case 'right':
                if(start < (this.props.max - offset + 1) ) {
                    start += offset;
                }
                break;
            case 'back':
                start = 1;
                break;
            case 'forward':
                start = this.props.max - offset + 1;
                break;

        }

        this.setState({
            start: start,
        });

        this.props.handleOnChange(start, offset);
    };

    handleOnChange = (item: ISelectInput) => {
        const value = parseInt(item.value);
        this.setState({
            selectedOffset: item,
            offset: value,
        });

        this.props.handleOnChange(this.state.start, value);
    };

    render() {
        return (
            <div>
                <Text>
                    {this.state.start}/{this.state.offset}
                </Text>
                <SelectInput
                    selectedItem={this.state.selectedOffset}
                    handleItemSelect={this.handleOnChange}
                    id={'tt'}
                    label={'Rows per page'}
                    items={ITEMS}
                />
                <Button value={'back'} onClick={this.handleOnClick} icon={"chevron-backward"}/>
                <Button value={'left'} onClick={this.handleOnClick} icon={"chevron-left"}/>
                <Button value={'right'} onClick={this.handleOnClick} icon={"chevron-right"}/>
                <Button value={'forward'} onClick={this.handleOnClick} icon={"chevron-forward"}/>
                <Button value={'back'} onClick={this.handleBack} icon={"arrow-left"}/>
            </div>
        );
    };
}
