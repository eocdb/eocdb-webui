import * as React from 'react';
import * as renderer from 'react-test-renderer';
import FileUpload from "./FileUpload";


interface MockProps {
    onDrop: () => void;
    files: File[];
}


const props: MockProps = {
    onDrop: jest.fn(),
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