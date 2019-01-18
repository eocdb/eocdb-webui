import * as React from 'react';
import SubmitPanel from "./SubmitPanel";
import { createMount } from '@material-ui/core/test-utils';


interface MockProps {
    show: boolean;
    submitStepsOpen: boolean;
    openSubmitSteps: () => void;
    closeSubmitSteps: () => void;
    setActiveStepUp: () => void;
    setActiveStepDown: () => void;
    activeStep: number;
}


const props: MockProps = {
    show: true,
    submitStepsOpen: false,
    openSubmitSteps: jest.fn(),
    closeSubmitSteps: jest.fn(),
    setActiveStepUp: jest.fn(),
    setActiveStepDown: jest.fn(),
    activeStep: 0,
};


const propsNull: MockProps = {
    show: false,
    submitStepsOpen: false,
    openSubmitSteps: jest.fn(),
    closeSubmitSteps: jest.fn(),
    setActiveStepUp: jest.fn(),
    setActiveStepDown: jest.fn(),
    activeStep: 0,
};


describe('<SubmitPanel />', () => {
    let mount: any;

    beforeEach(() => {
        mount = createMount();
    });

    afterEach(() => {
        mount.cleanUp();
    });

    it('SubmitPanel renders children', () => {
        const enzymeWrapper = mount(<SubmitPanel {...props} />);
        expect(enzymeWrapper.find('SubmitTable').length).toBe(1);
        expect(enzymeWrapper.find('SubmitSteps').length).toBe(1);
    });

    it('SubmitSteps does not render when show=0', () => {
        const enzymeWrapper = mount(<SubmitPanel {...propsNull} />);
        expect(enzymeWrapper.find('SubmitTable').length).toBe(0);
        expect(enzymeWrapper.find('SubmitSteps').length).toBe(0);
    });
});
