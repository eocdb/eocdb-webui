import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppHome } from './AppHome';
import { mount, ReactWrapper } from "enzyme";


interface MockProps {
    id: string;
}


describe("AppHomeTest", () => {
    let props: MockProps;
    let mountedAppScreen: ReactWrapper<MockProps, undefined, AppHome> | undefined;

    const appScreen = () => {
        if (!mountedAppScreen) {
            mountedAppScreen = mount(
                <AppHome {...props} />
            );
        }

        return mountedAppScreen;
    };

    beforeEach(() => {
        props = {
            id: "",
        };

        mountedAppScreen = undefined;
    });

    it('AppHome renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AppHome {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("AppHome state is null", () => {
        expect(appScreen().state()).toEqual(null );
    });
});
