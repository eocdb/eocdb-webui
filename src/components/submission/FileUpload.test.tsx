import * as React from 'react';
import * as renderer from 'react-test-renderer';
import FileUpload from "./FileUpload";


interface MockProps {
    onChange: () => void;
    label: string;
    files: File[];
}


const props: MockProps = {
    onChange: jest.fn(),
    label: '',
    files: [],
};


describe('FileUpload', () => {
    it('FileUpload renders', () => {
        const tree = renderer.create(
            <FileUpload {...props} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});