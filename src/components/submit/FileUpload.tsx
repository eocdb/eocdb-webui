import * as React from 'react';
import Dropzone from 'react-dropzone'
import Typography from "@material-ui/core/Typography/Typography";
import FileCopy from '@material-ui/icons/FileCopy';


interface FileUploadProps {
    onDrop: (acceptedFiles: any, rejectedFiles: any) => void;
    files: File[];

}

class FileUpload extends React.Component<FileUploadProps> {
    constructor(props: FileUploadProps) {
        super(props);
    }

    render() {
        return (
            <Dropzone
                onDrop={this.props.onDrop}
            >
                {this.props.files.map((file: File) => {
                        return (<Typography key={file.name}>
                            <FileCopy/>
                            {file.name}
                        </Typography>);
                    })}
            </Dropzone>
        );
    }
}

export default FileUpload