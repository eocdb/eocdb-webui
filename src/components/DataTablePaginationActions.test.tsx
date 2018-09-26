import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mount, ReactWrapper } from "enzyme";
import { DataTablePaginationActions} from "./DataTablePaginationActions";
import { Button, Text } from "@blueprintjs/core";
import { ISelectInput } from "./SelectInputItems";
import SelectInput from "./SelectInput";


interface MockProps {
    id: string;
    max: number;
    handleOnChange: (start: number, offset: number) => void;
}


interface MockState {
    selectedOffset: ISelectInput|undefined;
    offset: number;
    start: number;
}


describe("TestDataTablePaginationActions", () => {
    let props: MockProps;
    let mountedAppScreen: ReactWrapper<MockProps, MockState, DataTablePaginationActions> | undefined;

    const appScreen = () => {
        if (!mountedAppScreen) {
            mountedAppScreen = mount(
                <DataTablePaginationActions {...props} />
            );
        }

        return mountedAppScreen;
    };

    beforeEach(() => {
        props = {
            id: '',
            max: 0,
            handleOnChange: () => {},
        };

        mountedAppScreen = undefined;
    });

    it('DataTablePaginationActions renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<DataTablePaginationActions {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("DataTablePaginationActions always renders a 5 `Buttons`", () => {
        expect(appScreen().find(Button).length).toBe(5);
    });

    it("DataTablePaginationActions always renders 1 `SelectInput`", () => {
        expect(appScreen().find(SelectInput).length).toBe(1);
    });

    it("DataTablePaginationActions always renders 1 `Text`", () => {
        expect(appScreen().find(Text).length).toBe(1);
    });
});



