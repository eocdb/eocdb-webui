import * as React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import SubmitSteps from "./Submission";


interface MockProps {
    show: boolean;
    onClose: () => void;

    submissionId: string;
    path: string;
    dataFiles: File[];
    docFiles: File[];

    onSubmissionIdChange: () => void;
    onPathChange: () => void;
    onDatafilesChange: () => void;
    onDocfilesChange: () => void;

    onFileSubmit: () => void;
    updateSubmissions: () => void;

    onClearForm: () => void;

    onError: () => void;
}


const props: MockProps = {
    show: true,
    onClose: jest.fn(),

    submissionId: '',
    path: '',
    dataFiles: [],
    docFiles: [],

    onSubmissionIdChange: jest.fn(),
    onPathChange: jest.fn(),
    onDatafilesChange: jest.fn(),
    onDocfilesChange: jest.fn(),

    onFileSubmit: jest.fn(),
    updateSubmissions: jest.fn(),

    onClearForm: jest.fn(),

    onError: jest.fn(),
};


describe('<SubmitSteps />', () => {
    let mount: any;

    beforeEach(() => {
        mount = createMount();
    });

    afterEach(() => {
        mount.cleanUp();
    });

    it('SubmissionPanel renders children', () => {
        const enzymeWrapper = mount(<SubmitSteps {...props} />);

        expect(enzymeWrapper.find('TextField').length).toBe(2);
        expect(enzymeWrapper.find('FileUpload').length).toBe(2);
    });
});
