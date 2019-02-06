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
    onDrop: (acceptedFiles: any, rejectedFiles: any) => void;
    files: File[];
}


class FileUpload extends React.Component<FileUploadProps> {
    constructor(props: FileUploadProps) {
        super(props);
    }

    render() {
        return (
            <DropzoneArea />
        );
    }
}

export default withStyles(styles)(FileUpload)