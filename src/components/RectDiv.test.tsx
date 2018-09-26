import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mount, ReactWrapper } from "enzyme";
import { Rectangle } from "../types";
import { RectDiv } from "./RectDiv";


interface MockProps {
    id: string;
    opacity?: number;
    rectangle: Rectangle;
}


describe("TestRectDiv", () => {
    let props: MockProps;
    let mountedAppScreen: ReactWrapper<MockProps, undefined, RectDiv> | undefined;

    const appScreen = () => {
        if (!mountedAppScreen) {
            mountedAppScreen = mount(
                <RectDiv {...props} />
            );
        }

        return mountedAppScreen;
    };

    beforeEach(() => {
        props = {
            id: '',
            opacity: 0.5,
            rectangle: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
        };

        mountedAppScreen = undefined;
    });

    it('RectDiv renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RectDiv {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("RectDiv always renders 11 Buttons`", () => {
        const dv = appScreen().find('.rectdiv');

        expect(dv.length).toBe(1);
        expect(appScreen().find(RectDiv)).toHaveProperty('props');
    });
});



