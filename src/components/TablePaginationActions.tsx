import * as React from "react";
import { Button } from '@blueprintjs/core';
import SelectInput from './SelectInput'
import { ISelectInput } from "./SelectInputItems";


interface TablePaginationActionsProps {
    id: string;
}

const ITEMS: ISelectInput[] = [
    {label: '5', value: '5'},
    {label: '10', value: '10'},
    {label: '25', value: '25'},
];


export class TablePaginationActions extends React.PureComponent<TablePaginationActionsProps> {
    constructor(props: TablePaginationActionsProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <SelectInput id={'tt'} label={'Rows per page'} items={ITEMS}  />
                <Button icon={"chevron-backward"}/>
                <Button icon={"chevron-left"}/>
                <Button icon={"chevron-right"}/>
                <Button icon={"chevron-forward"}/>
            </div>
        );
    };
}
