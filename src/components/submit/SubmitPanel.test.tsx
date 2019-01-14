import * as React from 'react';
import { shallow } from "enzyme";
import SubmitPanel from "./SubmitPanel";


function setup(submitStepsOpen: boolean) {
    // const props = submitStepsOpen ? propsSubmitStepsOpen : propsSubmitStepsClosed;
    const props = {
        show: false,
        submitStepsOpen: submitStepsOpen,
        openSubmitSteps: jest.fn(),
        closeSubmitSteps: jest.fn(),
    };


    const enzymeWrapper = shallow(<SubmitPanel {...props} />);

    return {
        props,
        enzymeWrapper
    }
}


describe('<SubmitPanel />', () => {
   it('SubmitTable renders', () => {
       const { enzymeWrapper } = setup(false);
       expect(enzymeWrapper.find('SubmitTable').length).toBe(1);
   });


});
