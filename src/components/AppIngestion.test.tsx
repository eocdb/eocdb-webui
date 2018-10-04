import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mount, ReactWrapper } from "enzyme";
import { FileInput } from "@blueprintjs/core";

import AppIngestion from './AppIngestion';


interface MockProps {
    id: string
}


describe("AppTestIngestion", () => {
    let props: MockProps;
    let mountedAppScreen: ReactWrapper<MockProps, undefined, AppIngestion> | undefined;

    const appScreen = () => {
        if (!mountedAppScreen) {
            mountedAppScreen = mount(
                <AppIngestion {...props} />
            );
        }

        return mountedAppScreen;
    };

    beforeEach(() => {
        props = {
            id: "test"
        };

        mountedAppScreen = undefined;
    });

    it('AppIngestion renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AppIngestion {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("AppIngestion always renders a `FileInput`", () => {
        expect(appScreen().find(FileInput).length).toBe(1);
    });
});



