import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mount, ReactWrapper } from "enzyme";
import { DataTable } from './DataTable';
import { Cell } from "@blueprintjs/table";
import { MeasurementData } from "../types";
import { ISelectInput } from "./SelectInputItems";


interface MockProps {
    data?: MeasurementData;
    selectedOffsetItem?: ISelectInput | undefined;
}


describe("AppTestIngestion", () => {
    let props: MockProps;
    let mountedAppScreen: ReactWrapper<MockProps, undefined, DataTable> | undefined;

    const appScreen = () => {
        if (!mountedAppScreen) {
            mountedAppScreen = mount(
                <DataTable {...props} />
            );
        }

        return mountedAppScreen;
    };

    beforeEach(() => {
        props = {
            data: undefined,
            selectedOffsetItem: undefined,
        };

        mountedAppScreen = undefined;
    });

    it('AppIngestion renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<DataTable {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("AppIngestion always renders a `FileInput`", () => {
        expect(appScreen().find(Cell).length).toBe(1);
    });
});



