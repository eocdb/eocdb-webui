import * as React from 'react';
import SubmissionPanel from "./SubmissionPanel";
import { createShallow } from '@material-ui/core/test-utils';


interface MockProps {
    show: boolean;
    submissionOpen: boolean;
    openSubmission: () => void;
    closeSubmission: () => void;

    updateSubmissionId: (submissionId: string) => void;
    selectedSubmissionId: string;

    updatePath: (path: string) => void;
    selectedPath: string;

    updateDataFiles: (acceptedFiles: File[]) => void;
    selectedDataFiles: File[];

    updateDocFiles: (acceptedFiles: File[]) => void;
    selectedDocFiles: File[];

    onSubmissionsChange: () => void;

    sendSubmission: () => void;

    clearSubmissionForm: () => void;
    updateSubmissionsForUser: () => void;
}


const props: MockProps = {
    show: true,
    submissionOpen: false,
    openSubmission: jest.fn(),
    closeSubmission: jest.fn(),

    updateSubmissionId: jest.fn(),
    selectedSubmissionId: '',

    updatePath: jest.fn(),
    selectedPath: '',

    updateDataFiles: jest.fn(),
    selectedDataFiles: [],

    updateDocFiles: jest.fn(),
    selectedDocFiles: [],

    onSubmissionsChange: jest.fn,

    sendSubmission: jest.fn,

    clearSubmissionForm: jest.fn,
    updateSubmissionsForUser: jest.fn,
};


describe('<SubmissionPanel />', () => {
    let mount: any;

    beforeEach(() => {
        mount = createShallow();
    });

    it('SubmissionPanel renders children', () => {
        const enzymeWrapper = mount(<SubmissionPanel {...props} />);
        expect(enzymeWrapper.find('SubmissionPanel').length).toBe(1);
    });
});
