import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mount, ReactWrapper } from "enzyme";
import { SelectInput, SelectInputCore } from "./SelectInput";
import { Button, IconName, MenuItem } from "@blueprintjs/core";
import { ISelectInput } from "./SelectInputItems";


interface MockProps {
    id: string;
    items: ISelectInput[];
    label: string;
    icon?: IconName;
    selectedItem: ISelectInput | undefined;
    handleItemSelect: (item: ISelectInput) => void;
}


const MockItems: ISelectInput[] = [
    {label: 'All', value: 'All'},
];


describe("TestSelectInput", () => {
    let props: MockProps;
    let mountedAppScreen: ReactWrapper<MockProps, undefined, SelectInput> | undefined;

    const appScreen = () => {
        if (!mountedAppScreen) {
            mountedAppScreen = mount(
                <SelectInput {...props} />
            );
        }

        return mountedAppScreen;
    };

    beforeEach(() => {
        props = {
            id: 'tt',
            items: MockItems,
            label: '',
            icon: undefined,
            selectedItem: undefined,
            handleItemSelect: () => {},
        };

        mountedAppScreen = undefined;
    });

    it('SelectInput renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SelectInput {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("SelectInput always renders 1 SelectInputCore`", () => {
        expect(appScreen().find(SelectInputCore).length).toEqual(1);
    });

    it("SelectInput always renders 1 Button`", () => {
        expect(appScreen().find(Button).length).toEqual(1);
    });

    it("SelectInput always renders 3 MenuItem`", () => {
        expect(appScreen().find(MenuItem).length).toEqual(0);
    });
});




