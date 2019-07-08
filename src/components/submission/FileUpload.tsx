import * as React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    root: {}
});


interface FileUploadProps extends WithStyles<typeof styles> {
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

export default withStyles(styles)(FileUpload)