import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppList } from './AppList';
import { mount, ReactWrapper } from "enzyme";


interface MockProps {
    id: string;
}


interface MockState{
    report: string;
}


describe("AppListTest", () => {
    let props: MockProps;
    let mountedAppScreen: ReactWrapper<MockProps, MockState, AppList> | undefined;

    const appScreen = () => {
        if (!mountedAppScreen) {
            mountedAppScreen = mount(
                <AppList {...props} />
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

    it('AppList renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AppList {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("AppList default state is {\"report\": \"Scientist\"}", () => {
        expect(appScreen().state()).toEqual({"report": "Scientist"});
    });
});
