import * as React from "react";

import { DatasetIssue, SubmissionFile } from "../../model";
import {
    SlideProps,
    Slide,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    Button
} from "@mui/material";


// noinspection JSUnusedLocalSymbols
// const styles = (theme: Theme) => createStyles({
//     appBar: {
//         position: 'relative',
//     },
//     flex: {
//         flex: 1,
//     },
//     searchField: {
//         width: 300,
//     },
//     textField: {},
//     button: {},
//     rightIcon: {},
//     tableContainer: {},
// });


// function Transition(props: SlideProps) {
//     return <Slide direction="up" {...props} />;
// }


export interface SubmissionIssueDialogProps {
    open: boolean;
    onClose: () => void;

    submissionFileValue: SubmissionFile;
}


class SubmissionIssueDialog extends React.Component<SubmissionIssueDialogProps> {
    constructor(props: SubmissionIssueDialogProps) {
        super(props);
    }

    render() {
        const {submissionFileValue} = this.props;

        let issues:DatasetIssue[] = [];
        let fileName = 'unknown';

        if(submissionFileValue && submissionFileValue.result) {
            issues = submissionFileValue.result.issues;
            fileName = submissionFileValue.filename;
        }

        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                    // TransitionComponent={Transition}
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
                    <DialogActions>
                        <Button onClick={this.props.onClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default SubmissionIssueDialog;

