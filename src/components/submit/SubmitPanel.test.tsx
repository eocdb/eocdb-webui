import * as React from 'react';
import SubmitPanel from "./SubmitPanel";
import { createShallow } from '@material-ui/core/test-utils';


interface MockProps {
    show: boolean;
    submitStepsOpen: boolean;
    openSubmitSteps: () => void;
    closeSubmitSteps: () => void;
}


const props: MockProps = {
    show: true,
    submitStepsOpen: false,
    openSubmitSteps: jest.fn(),
    closeSubmitSteps: jest.fn(),
};


describe('<SubmitPanel />', () => {
    let mount: any;

    beforeEach(() => {
        mount = createShallow();
    });


    it('SubmitPanel renders children', () => {
        const enzymeWrapper = mount(<SubmitPanel {...props} />);
        expect(enzymeWrapper.find('SubmitPanel').length).toBe(1);
    });
});
