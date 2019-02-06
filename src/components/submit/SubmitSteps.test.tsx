import * as React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import SubmitSteps from "./SubmitSteps";


interface MockProps {
    show: boolean;
    closeSubmitSteps: () => void;

    dataFiles: File[];
    docFiles: File[];

    onDatafilesChange: () => void;
    onDocfilesChange: () => void;
}


const props: MockProps = {
    show: true,
    closeSubmitSteps: jest.fn(),

    dataFiles: [],
    docFiles: [],

    onDatafilesChange: jest.fn(),
    onDocfilesChange: jest.fn(),
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
        expect(enzymeWrapper.find('FileUpload').length).toBe(2);
    });
});
