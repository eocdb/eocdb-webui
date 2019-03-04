import * as React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import Submission from "./Submission";


interface MockProps {
    show: boolean;
    onClose: () => void;

    onSubmissionIdChange: (submissionId: string) => void;
    submissionIdValue: string;

    onPathChange: (path: string) => void;
    pathValue: string;

    onDatafilesChange: (acceptedFiles: File[]) => void;
    dataFilesValue: File[];

    onDocfilesChange: (acceptedFiles: File[]) => void;
    docFilesValue: File[];

    onFileSubmit: () => void;
    onSubmissionsChange: () => void;
    onClearForm: () => void;
}


const props: MockProps = {
    show: true,
    onClose: jest.fn(),

    submissionIdValue: '',
    pathValue: '',
    dataFilesValue: [],
    docFilesValue: [],

    onSubmissionIdChange: jest.fn(),
    onPathChange: jest.fn(),
    onDatafilesChange: jest.fn(),
    onDocfilesChange: jest.fn(),

    onFileSubmit: jest.fn(),
    onClearForm: jest.fn(),
    onSubmissionsChange: jest.fn,

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
        const enzymeWrapper = mount(<Submission {...props} />);

        expect(enzymeWrapper.find('TextField').length).toBe(2);
        expect(enzymeWrapper.find('FileUpload').length).toBe(2);
    });
});
