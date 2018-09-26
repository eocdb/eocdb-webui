import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { mount, ReactWrapper } from "enzyme";
import { SearchField } from "./SearchField";
import { InputGroup } from "@blueprintjs/core";


interface MockProps {
    queryString: string;
    onQueryStringChange: (queryString: string) => void;
}


interface MockState {
    queryString: string;
}


describe("TestSearchField", () => {
    let props: MockProps;
    let mountedAppScreen: ReactWrapper<MockProps, MockState, SearchField> | undefined;

    const appScreen = () => {
        if (!mountedAppScreen) {
            mountedAppScreen = mount(
                <SearchField {...props} />
            );
        }

        return mountedAppScreen;
    };

    beforeEach(() => {
        props = {
            queryString: 'ernie',
            onQueryStringChange: () => {},
        };

        mountedAppScreen = undefined;
    });

    it('SearchField renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SearchField {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("SearchField always renders 1 InputGroup`", () => {
        const dv = appScreen().find(InputGroup);
        expect(dv.length).toBe(1);
    });

    /*
    it("SearchField state should be ernie", () => {
        expect(appScreen().state()).toEqual({queryString: "ernie"});
        const evt: React.KeyboardEvent<HTMLElement> =
        appScreen().instance().handleOnKeyDown();
    });
    */
});




