import * as React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import SubmitSteps from "./SubmitSteps";


interface MockProps {
    show: boolean;
    closeSubmitSteps: () => void;

    submissionId: string;
    dataFiles: File[];
    docFiles: File[];

    onSubmissionIdChange: () => void;
    onDatafilesChange: () => void;
    onDocfilesChange: () => void;
}


const props: MockProps = {
    show: true,
    closeSubmitSteps: jest.fn(),

    submissionId: '',
    dataFiles: [],
    docFiles: [],

    onSubmissionIdChange: jest.fn(),
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

        expect(enzymeWrapper.find('TextField').length).toBe(1);
        expect(enzymeWrapper.find('FileUpload').length).toBe(2);
    });
});
