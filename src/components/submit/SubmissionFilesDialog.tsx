import * as React from "react";
import { Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide, { SlideProps } from '@material-ui/core/Slide';

import createStyles from "@material-ui/core/styles/createStyles";
import { WithStyles } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";


// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    searchField: {
        width: 300,
    },
    textField: {},
    button: {},
    rightIcon: {},
    tableContainer: {},
});


function Transition(props: SlideProps) {
    return <Slide direction="up" {...props} />;
}


export interface SubmissionfilesDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    onClose: () => void;

    submissionId: string;
    //submissions: SubmissionFileRefs[];
}


class SubmissionFilesDialog extends React.Component<SubmissionfilesDialogProps> {
    constructor(props: SubmissionfilesDialogProps) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.props.open}
                    onClose={this.props.onClose}
                    TransitionComponent={Transition}
                >
                    <DialogTitle id="form-dialog-title">Submission Files for {this.props.submissionId}</DialogTitle>
                    <DialogActions className={classes.appBar}>
                        <Button onClick={this.props.onClose}
                                aria-label="Close"
                                variant="contained"
                                color="secondary"
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default withStyles(styles)(SubmissionFilesDialog);

