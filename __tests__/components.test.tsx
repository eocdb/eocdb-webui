import { configure, ReactWrapper } from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';

configure({adapter: new ReactSixteenAdapter()});
import { mount } from "enzyme";

import * as React from 'react';
import { Dispatch } from "redux";
import { Button } from "@blueprintjs/core";

import { App } from "../src/components/App";
import { AppHome } from "../src/components/AppHome";
import { AppList } from "../src/components/AppList";
import Navigation from "../src/components/Navigation";
import { AppSearch } from "../src/components/AppSearch";
import { AppIngestion } from "../src/components/AppIngestion";
import { AppHelp } from "../src/components/AppHelp";
import { MeasurementData } from "../src/types";


interface MockState {
    navTarget: string;
}


interface MockProps{
    queryString: string;
    data?: MeasurementData;
    onQueryMeasurements: (queryString: string) => any;
}


function mockAction(error: string) {
    return {
        type: 'test',
        error
    }
}


function mockThunk(queryString: string) {
    return (dispatch: Dispatch) => {
        dispatch(mockAction(queryString));
    };
}


describe("AppScreen", () => {
    let props: MockProps;
    let mountedAppScreen: ReactWrapper<MockProps, MockState, App> | undefined;

    const appScreen = () => {
        if (!mountedAppScreen) {
            mountedAppScreen = mount(
                <App {...props} />
            );
        }

        return mountedAppScreen;
    }

    beforeEach(() => {
        props = {
            queryString: "",
            data: undefined,
            onQueryMeasurements: mockThunk,
        };

        mountedAppScreen = undefined;
    });

    // All tests will go here
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