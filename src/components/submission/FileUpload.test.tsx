import * as React from 'react';
import * as renderer from 'react-test-renderer';
import FileUpload from "./FileUpload";


interface MockProps {
    onChange: () => void;
    label: string;
    files: File[];
    onDropRejected: () => void;
}


const props: MockProps = {
    onChange: jest.fn(),
    label: '',
    files: [],
    onDropRejected: jest.fn()
};


describe('FileUpload', () => {
    it('FileUpload renders', () => {
        const tree = renderer.create(
            <FileUpload {...props} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});