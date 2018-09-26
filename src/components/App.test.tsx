import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { mount, ReactWrapper } from "enzyme";
import { MeasurementData, Rectangle } from "../types";
import Navigation from "./Navigation";
import { Button } from "@blueprintjs/core";
import { AppHome } from "./AppHome";
import { AppSearch } from "./AppSearch";
import { AppList } from "./AppList";
import { AppIngestion } from "./AppIngestion";
import { AppHelp } from "./AppHelp";


interface MockState {
    navTarget: string;
}


interface MockProps {
    queryString: string;
    rectangle: Rectangle,
    data?: MeasurementData;
    onQueryMeasurements: (queryString: string) => any;
    onPageChange: (start: number, offset: number) => void;
    onRegionChange: (rectangle: Rectangle) => void;
}


function onQueryMeasurements() {
}

function onPageChange() {
}

function onRegionChange() {
}


describe("AppTest", () => {
    let props: MockProps;
    let mountedAppScreen: ReactWrapper<MockProps, MockState, App> | undefined;

    const appScreen = () => {
        if (!mountedAppScreen) {
            mountedAppScreen = mount(
                <App {...props} />
            );
        }

        return mountedAppScreen;
    };

    beforeEach(() => {
        props = {
            queryString: "",
            data: undefined,
            rectangle: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
            onQueryMeasurements: onQueryMeasurements,
            onPageChange: onPageChange,
            onRegionChange: onRegionChange,
        };

        mountedAppScreen = undefined;
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("default state is always {\"navTarget\": \"home\"}", () => {
        expect(appScreen().state()).toEqual({"navTarget": "home"});
    });

    it("always renders a `Navigation`", () => {
        expect(appScreen().find(Navigation).length).toBe(1);
    });

    it("always renders 5 tabs in `Navigation`", () => {
        expect(appScreen().find(Button).length).toBe(6);
    });

    it("render HomeApp when button is clicked", () => {
        const btn = appScreen().find(Button).at(1);

        btn.simulate('click');
        expect(appScreen().state()).toEqual({"navTarget": "home"});
        expect(appScreen().find(AppHome).length).toBe(1);
    });

    it("render SearchApp when button is clicked", () => {
        const btn = appScreen().find(Button).at(2);

        btn.simulate('click');
        expect(appScreen().find(AppSearch).length).toBe(1);
    });

    it("render ListApp when button is clicked", () => {
        const btn = appScreen().find(Button).at(3);

        btn.simulate('click');
        expect(appScreen().find(AppList).length).toBe(1);
    });

    it("render AppIngestion when button is clicked", () => {
        const btn = appScreen().find(Button).at(4);

        btn.simulate('click');
        expect(appScreen().find(AppIngestion).length).toBe(1);
    });

    it("render AppHelp when button is clicked", () => {
        const btn = appScreen().find(Button).at(5);

        btn.simulate('click');
        expect(appScreen().find(AppHelp).length).toBe(1);
    });
});
