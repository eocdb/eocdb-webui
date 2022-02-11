import * as React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';


interface FileUploadProps {
    label: string;
    onChange: (acceptedFiles: File[]) => void;
    files: File[];
    acceptedFiles?: string[];
    onDropRejected: (files: File[]) => void;
}


class FileUpload extends React.Component<FileUploadProps> {
    constructor(props: FileUploadProps) {
        super(props);
    }

    handleOnchange = (files: File[]) => {
        this.props.onChange(files);
    };

    handleOnDropRejected = (files: File[]) => {
       this.props.onDropRejected(files);
    };

    render() {
        return (
            <DropzoneArea
                onDropRejected={this.handleOnDropRejected}
                onChange={this.handleOnchange}
                filesLimit={500}
                maxFileSize={1000000000}
                showFileNamesInPreview={true}
                acceptedFiles={this.props.acceptedFiles}
                clearOnUnmount={true}
                dropzoneText={this.props.label}
            />
        );
    }
}

export default FileUpload;
