import * as React from 'react';
import App from './App';
import Dashboard from "./containers/Dashboard";
import { CssBaseline } from "@material-ui/core";
import { shallow } from "enzyme";

describe("App", () => {
    it('renders DashBoard', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Dashboard).length).toBe(1);
    });

    it('renders CssBaseline', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(CssBaseline).length).toBe(1);
    });

    /* TODO: Check why App does not render MessageLog. Should/Does*/
    // it('renders MessageLog', () => {
    //     const wrapper = shallow(<App />);
    //     expect(wrapper.find(MessageLog).length).toBe(1);
    // });
});