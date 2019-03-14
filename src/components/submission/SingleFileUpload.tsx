import * as React from "react";
import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    withStyles,
    WithStyles
} from "@material-ui/core";

import Dropzone from "react-dropzone";


const styles = createStyles({
    root: {},
    appBar: {
        position: 'relative',
    },
});

interface SingleFileUploadProps<T> extends WithStyles<typeof styles> {
    label: string;
    open: boolean;
    onCancel: () => void;
    onSave: (value: T, file: File) => void;

    value: T;
}


interface SingleFileUploadState {
    files: File[];
}


class SingleFileUpload<T> extends React.Component<SingleFileUploadProps<T>, SingleFileUploadState> {
    constructor(props: SingleFileUploadProps<T>) {
        super(props);

        this.state = {
            files: []
        }
    }

    handleOnSave = (value: T) => {
        this.props.onCancel();
    };

    handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        //this.setState({file: event.target.value})
    };

    handleOnDrop = (files: File[]) => {
        console.log(files);
    };

    render() {
        const {classes} = this.props;

       /* const files = this.state.files.map((file: File) => (
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        ));
*/
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onCancel}
            >
                <DialogTitle id="form-dialog-title">Upload new Submission File</DialogTitle>
                <DialogContent>
                    <Dropzone onDrop={this.handleOnDrop}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                                <aside>
                                    <h4>Files</h4>
                                    <ul>{this.state.files}</ul>
                                </aside>
                            </section>
                        )}
                    </Dropzone>
                </DialogContent>
                <DialogActions className={classes.appBar}>
                    <Button onClick={this.props.onCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.handleOnSave(this.props.value)} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(SingleFileUpload)