import * as React from 'react';
import Dropzone from 'react-dropzone'
import Typography from "@material-ui/core/Typography/Typography";
import FileCopy from '@material-ui/icons/FileCopy';


interface FileUploadProps {
    onDrop: (acceptedFiles: any, rejectedFiles: any) => void;
    files: File[];

}

export class FileUpload extends React.Component<FileUploadProps> {
    constructor(props: FileUploadProps){
        super(props);
    }

    render() {
        const num_files = this.props.files.length;
        let fns = [];

        for (let i = 0; i < num_files; i++) {
            fns.push(
                <Typography key={this.props.files[i].name}>
                    <FileCopy/>
                    {this.props.files[i].name}
                </Typography>
            )
        }

        return (
            <Dropzone
                onDrop={this.props.onDrop}
            >
                {fns}
            </Dropzone>
        );
    }
}