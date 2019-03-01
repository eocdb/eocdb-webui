import * as React from "react";
import { Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide, { SlideProps } from '@material-ui/core/Slide';

import createStyles from "@material-ui/core/styles/createStyles";
import { WithStyles } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import { DatasetIssue, SubmissionFile } from "../../model";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography/Typography";


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


export interface SubmissionIssueDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    onClose: () => void;

    submissionFile: SubmissionFile;
}


class SubmissionIssueDialog extends React.Component<SubmissionIssueDialogProps> {
    constructor(props: SubmissionIssueDialogProps) {
        super(props);
    }

    render() {
        const {classes, submissionFile} = this.props;

        let issues:DatasetIssue[] = [];
        let fileName = 'unknown';

        if(submissionFile) {
            issues = submissionFile.result.issues;
            fileName = submissionFile.filename;
        }


        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                    TransitionComponent={Transition}
                >
                    <DialogTitle id="form-dialog-title">Submission Issues for {fileName}</DialogTitle>
                    <DialogContent>
                        {
                            issues.map((issue: DatasetIssue) => {
                                return(
                                    <div>
                                        <Typography color={"error"} variant="overline" gutterBottom>{issue.type}</Typography>
                                        <Typography>{issue.description}</Typography>
                                    </div>
                                );
                            })
                        }
                    </DialogContent>
                    <DialogActions className={classes.appBar}>
                        <Button onClick={this.props.onClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(SubmissionIssueDialog);

