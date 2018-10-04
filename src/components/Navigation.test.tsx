import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ReactWrapper, mount } from "enzyme";
import Navigation from "./Navigation";
import { RectDiv } from "./RectDiv";
import { Button, Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Popover } from "@blueprintjs/core";


interface MockProps {
    handleNavigationClick: (event: React.MouseEvent<HTMLElement>, navTarget: string) => void;
}


describe("<Navigation>", () => {
    let props: MockProps;
    let mountedAppScreen: ReactWrapper<MockProps, undefined, RectDiv> | undefined;

    const appScreen = () => {
        if (!mountedAppScreen) {
            mountedAppScreen = mount(
                <Navigation {...props} />
            );
        }

        return mountedAppScreen;
    };

    beforeEach(() => {
        props = {
            handleNavigationClick: () => {},
        };

        mountedAppScreen = undefined;
    });

    it('Navigation renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Navigation {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("Navigation always renders 1 NavBar`", () => {
        expect(appScreen().find(Navbar).length).toEqual(1);
    });

    it("Navigation always renders 1 NavbarHeading`", () => {
        expect(appScreen().find(NavbarHeading).length).toEqual(1);
    });

    it("Navigation always renders 2 NavbarGroup`", () => {
        expect(appScreen().find(NavbarGroup).length).toEqual(2);
    });


    it("Navigation always renders 1 Popover`", () => {
        expect(appScreen().find(Popover).length).toEqual(1);
    });

    it("Navigation always renders 6 Buttons`", () => {
        expect(appScreen().find(Button).length).toEqual(6);
    });

    it("Navigation always renders 2 NavbarDividers`", () => {
        expect(appScreen().find(NavbarDivider).length).toEqual(1);
    });

    it("Navigation always renders 1 img (the logo)`", () => {
        expect(appScreen().find('img').length).toEqual(1);
    });


});



