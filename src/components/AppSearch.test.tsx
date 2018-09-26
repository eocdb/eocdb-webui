import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppSearch } from "./AppSearch";
import { mount, ReactWrapper } from "enzyme";
import { MeasurementData, Rectangle } from "../types";
import { SearchField } from "./SearchField";
import { RegionSelect } from "./RegionSelect";
import { DataTable } from "./DataTable";
import { DataTablePaginationActions } from "./DataTablePaginationActions";
import { Cell } from "@blueprintjs/table";
import { InputGroup } from "@blueprintjs/core";


interface MockProps {
    id: string;
    queryString: string;
    data?: MeasurementData;
    onQueryStringChange: (queryString: string) => void;
    onPageChange: (start: number, offset: number) => void;
    onRegionChange: (rectangle: Rectangle) => void;
}



describe("AppListTest", () => {
    let props: MockProps;
    let mountedAppScreen: ReactWrapper<MockProps, undefined, AppSearch> | undefined;

    const appScreen = () => {
        if (!mountedAppScreen) {
            mountedAppScreen = mount(
                <AppSearch {...props} />
            );
        }

        return mountedAppScreen;
    };

    beforeEach(() => {
        props = {
            id: "",
            queryString: 'ernie',
            data: undefined,
            onQueryStringChange: () => {},
            onPageChange: () => {},
            onRegionChange: () => {},
        };

        mountedAppScreen = undefined;
    });

    it('AppList renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AppSearch {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("SearchField is rendered", () => {
        expect(appScreen().find(SearchField).length).toBe(1);
    });

    it("RegionSelect is rendered", () => {
        expect(appScreen().find(RegionSelect).length).toBe(1);
    });

    it("DataTable is rendered", () => {
        expect(appScreen().find(DataTable).length).toBe(1);
    });

    it("DataTablePaginationActions is rendered", () => {
        expect(appScreen().find(DataTablePaginationActions).length).toBe(1);
    });

    it("Find one cell in data table", () => {
        expect(appScreen().find(Cell).length).toBe(1);
    });

    it("Find 5 InputGroups", () => {
        expect(appScreen().find(InputGroup).length).toBe(5);
    });
});
