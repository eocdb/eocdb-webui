import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppHelp } from './AppHelp';
import { mount, ReactWrapper } from "enzyme";


interface MockProps {
    id: string;
}


describe("AppHelpTest", () => {
    let props: MockProps;
    let mountedAppScreen: ReactWrapper<MockProps, undefined, AppHelp> | undefined;

    const appScreen = () => {
        if (!mountedAppScreen) {
            mountedAppScreen = mount(
                <AppHelp {...props} />
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

    it('AppHelp renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AppHelp {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("AppHelp state is null", () => {
        expect(appScreen().state()).toEqual(null );
    });
});
