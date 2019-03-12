import * as React from "react";
import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Input,
    withStyles,
    WithStyles
} from "@material-ui/core";


const styles = createStyles({
    root: {},
    appBar: {
        position: 'relative',
    },
});

interface SingleFileUploadProps extends WithStyles<typeof styles> {
    label: string;
    open: boolean;
    onCancel: () => void;
    onSave: () => void;
}

class SingleFileUpload extends React.Component<SingleFileUploadProps> {
    constructor(props: SingleFileUploadProps) {
        super(props);
    }

    render() {
        const {classes} = this.props;

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onCancel}
            >
                <DialogTitle id="form-dialog-title">Upload new Submission File</DialogTitle>
                <DialogContent>
                    <Input type={'file'}>
                        {this.props.label}
                    </Input>
                </DialogContent>
                <DialogActions className={classes.appBar}>
                    <Button onClick={this.props.onCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.props.onSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withStyles(styles)(SingleFileUpload)