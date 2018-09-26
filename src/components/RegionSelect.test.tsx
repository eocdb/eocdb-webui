import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mount, ReactWrapper } from "enzyme";
import { RegionSelect } from './RegionSelect';
import { Rectangle } from "../types";
import { Button } from "@blueprintjs/core";
import { RectDiv } from "./RectDiv";
import map_atlantic from './blue_marble_xs.jpg';
import map_pacific from './blue_marble_xs_pacific.jpg';


interface MockProps {
    id: string;
    idRect?: string;
    onRegionChange: (rectangle: Rectangle)=> void;
}

interface MockState {
    rectangle: Rectangle;
    opacity: number;
    map: string;
    centre: number;
    prevent_send: boolean;
}


let expected_state = {
    rectangle: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    },
    opacity: 0,
    map: map_atlantic,
    centre: 0,
    prevent_send: true,
};


describe("TestRegionSelect", () => {
    let props: MockProps;
    let mountedAppScreen: ReactWrapper<MockProps, MockState, RegionSelect> | undefined;

    const appScreen = () => {
        if (!mountedAppScreen) {
            mountedAppScreen = mount(
                <RegionSelect {...props} />
            );
        }

        return mountedAppScreen;
    };

    beforeEach(() => {
        props = {
            id: '',
            idRect: undefined,
            onRegionChange: ()=> {},
        };

        mountedAppScreen = undefined;
    });

    it('AppIngestion renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RegionSelect {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("AppIngestion always renders 11 Buttons`", () => {
        expect(appScreen().find(Button).length).toBe(11);
    });


    it("AppIngestion always renders a `RectDiv`", () => {
        expect(appScreen().find(RectDiv).length).toBe(1);
    });

    it("default state", () => {

        expect(appScreen().state()).toEqual(expected_state);
    });

    it("state contains map_pacific", () => {
        const btn = appScreen().find(Button).at(0);


        const exp = {...expected_state, map: map_pacific};
        btn.simulate('click');
        expect(appScreen().state()).toEqual(exp);
    });

    /*it('check whether pacific image exists', () => {
        const res = imageExists(map_pacific);

        expect(res).toEqual(true);
    });*/
});



