import * as React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import SubmitSteps from "./SubmitSteps";


interface MockProps {
    show: boolean;
    closeSubmitSteps: () => void;

    setActiveStepUp: () => void;
    setActiveStepDown: () => void;
    activeStep: number;
}


const props: MockProps = {
    show: true,
    closeSubmitSteps: jest.fn(),

    setActiveStepUp: jest.fn(),
    setActiveStepDown: jest.fn(),
    activeStep: 0,
};


describe('<SubmitSteps />', () => {
    let mount: any;

    beforeEach(() => {
        mount = createMount();
    });

    afterEach(() => {
        mount.cleanUp();
    });

    it('SubmitPanel renders children', () => {
        const enzymeWrapper = mount(<SubmitSteps {...props} />);
        expect(enzymeWrapper.find('Stepper').length).toBe(1);
        expect(enzymeWrapper.find('Step').length).toBe(1);
    });
});
