import * as React from 'react';
import Dropzone from 'react-dropzone'
import Typography from "@material-ui/core/Typography/Typography";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import { FileCopy } from "@material-ui/icons";


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

export default withStyles(styles)(FileUpload)