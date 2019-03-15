import * as React from "react";
import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Icon, List, ListItem, ListItemIcon, Typography,
    withStyles,
    WithStyles
} from "@material-ui/core";

import FolderIcon from '@material-ui/icons/Folder';

import Dropzone, { DropzoneState } from "react-dropzone";


const styles = createStyles({
    root: {},
    appBar: {
        position: 'relative',
    },
    dropzone: {
        textAlign: 'center',
        //borderRadius: '25px',
        border: '4px solid #C8C8C8',
        borderStyle: 'dashed',
        padding: '2em',
        width: '100%',
        height: '10%',
        backgroundColor: "#F0F0F0",
    }
});


interface SingleFileUploadProps<T> extends WithStyles<typeof styles> {
    label: string;
    open: boolean;
    onCancel: () => void;
    onSave: (value: T, file: File[]) => void;

    value: T;
}


interface SingleFileUploadState {
    files: File[];
    color: string;
}


class SingleFileUpload<T> extends React.Component<SingleFileUploadProps<T>, SingleFileUploadState> {
    constructor(props: SingleFileUploadProps<T>) {
        super(props);

        this.state = {
            files: [],
            color: '#F0F0F0',
        }
    }

    handleOnSave = (value: T) => {
        this.props.onSave(value, this.state.files);
        this.props.onCancel();
    };

    handleOnDrop = (files: File[]) => {
        this.setState({files: files, color: '#F0F0F0'});
    };

    handleDragOver = () => {
        this.setState({color: '#35dd65'});
    };

    handleFileDelete = (fileName: string) => {
        const files = this.state.files;
        const index = files.findIndex(f => f.name === fileName); //find index in your array

        files.splice(index, 1);

        this.setState({files: files});

        if (files.length == 0) {
            this.setState({color: '#F0F0F0'});
        }
    };

    render() {
        const {classes} = this.props;

        const files = this.state.files.map((file: File) => (
            <ListItem key={'item_' + file.name}>
                <ListItemIcon key={'item_icon_' + file.name}>
                    <FolderIcon key={'item_icon_folder' + file.name}/>
                </ListItemIcon>
                {file.name} - {file.size} bytes
                <Button
                    key={'button_' + file.name}
                    onClick={() => this.handleFileDelete(
                        file.name
                    )}
                >
                    <Icon key={'item_icon_delete' + file.name}>delete</Icon>
                </Button>
            </ListItem>
        ));

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onCancel}
            >
                <DialogTitle id="form-dialog-title">Upload new Submission File</DialogTitle>
                <DialogContent>
                    <Dropzone
                        onDrop={this.handleOnDrop}
                        onDragEnter={this.handleDragOver}
                        accept={'.sb, .dat, .txt'}
                    >
                        {({getRootProps, getInputProps, isDragActive, isDragReject}: DropzoneState) => (
                            <section>
                                <div style={{backgroundColor: isDragReject ? 'red' : '#F0F0F0"'}}
                                     className={classes.dropzone} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <Typography component={'p'}>
                                        Drag 'n' drop your file here, or click to select
                                    </Typography>
                                    <Icon style={{color: '#909090'}}>cloud_upload</Icon>
                                </div>
                                <List dense>
                                    {files}
                                </List>
                            </section>
                        )}
                    </Dropzone>
                </DialogContent>
                <DialogActions className={classes.appBar}>
                    <Button key={'Cancel'} onClick={this.props.onCancel} color="primary">
                        Cancel
                    </Button>
                    <Button key={'Save'} onClick={() => this.handleOnSave(this.props.value)} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(SingleFileUpload)