import * as React from "react";
import HelpDialog from "../messages/HelpDialog";
import SubmissionHelpText from "../messages/Help/submission";
import {
    Dialog,
    DialogTitle,
    Grid,
    IconButton,
    Icon,
    TextField,
    FormControlLabel,
    Checkbox,
    DialogActions,
    Button
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";


// const styles = (theme: Theme) => createStyles({
//     root: {
//         width: '100%',
//     },
//     button: {
//         marginRight: theme.spacing.unit,
//     },
//     textField: {
//         width: 200,
//         marginTop: theme.spacing.unit / 2,
//         marginRight: theme.spacing.unit / 2,
//     },
//     dense: {
//         marginTop: 16,
//     },
//     instructions: {
//         marginTop: theme.spacing.unit,
//         marginBottom: theme.spacing.unit,
//     },
//     dialogContent: {
//         marginLeft: theme.spacing.unit * 4,
//         marginRight: theme.spacing.unit * 4,
//         marginTop: theme.spacing.unit * 4,
//         marginBottom: theme.spacing.unit * 4,
//     },
//     appBar: {
//         position: 'relative',
//     },
// });
//

interface SubmissionMetaDialogProps {
    show: boolean;
    submissionId: string;

    onClose: () => void;

    onSubmissionIdChange: (submissionId: string) => void;
    submissionIdValue: string;

    onPathChange: (path: string) => void;
    pathValue: string;

    onAllowPublicationChange: (allowPublication: boolean) => void;
    allowPublication: boolean;

    onPublicationDateChange: (publicationDate: string | null) => void;
    publicationDate: string | null;

    onSubmit: () => void;

    onClearForm: () => void;

    helpDialogOpen: boolean;
    openHelpDialog: () => void;
    closeHelpDialog: () => void;

    submissionSucceeded: boolean;
}


class SubmissionMetaDialog extends React.Component<SubmissionMetaDialogProps> {
    constructor(props: SubmissionMetaDialogProps) {
        super(props);
    }

    handleSubmissionIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        this.props.onSubmissionIdChange(value);
    };

    handleOnPathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const path = event.target.value;

        this.props.onPathChange(path);
    };

    handlePublicationDateChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        this.props.onAllowPublicationChange(checked);
    };

    handleSubmit = () => {
        this.props.onSubmit();
        if (this.props.submissionSucceeded) {
            this.props.onClearForm();
            this.props.onClose();
        }
    };

    render() {
        return (
            <Dialog
                open={this.props.show}
                onClose={this.props.onClose}
            >
                <div>
                    <DialogTitle id="form-dialog-title">Update Submission Meta Data</DialogTitle>

                    <Grid container>
                        <IconButton
                            onClick={this.props.openHelpDialog}
                        >
                            <Icon color={"secondary"}>
                                help
                            </Icon>
                        </IconButton>
                        <HelpDialog
                            open={this.props.helpDialogOpen}
                            onClose={this.props.closeHelpDialog}
                            title={'Submission Help'}
                        >
                            {SubmissionHelpText}
                        </HelpDialog>
                    </Grid>
                    <Grid container spacing={16}>
                        <Grid item>
                            <TextField
                                required
                                id="outlined-dense"
                                label="Submission Label"
                                // className={classNames(classes.textField)}
                                margin="dense"
                                variant="outlined"
                                onChange={this.handleSubmissionIdChange}
                                value={this.props.submissionIdValue}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                required
                                id="submission-path"
                                label="Submission Path"
                                // className={classNames(classes.textField)}
                                margin="dense"
                                variant="outlined"
                                onChange={this.handleOnPathChange}
                                value={this.props.pathValue}
                            />
                        </Grid>
                        <Grid item>
                            <DatePicker
                                value={this.props.publicationDate}
                                onChange={this.props.onPublicationDateChange}
                                renderInput={(params) => <TextField {...params} helperText={null} />}
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                control={<Checkbox
                                    value={'publish'}
                                    checked={this.props.allowPublication}
                                    onChange={this.handlePublicationDateChange}
                                />
                                }
                                label={'Publish Data (Y)'}
                            />
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <Button variant="contained"
                                color="secondary"
                                // className={classes.button}
                                onClick={this.handleSubmit}
                        >
                            Submit
                            <CloudUpload/>
                        </Button>
                        <Button variant="contained"
                                color="secondary"
                                // className={classes.button}
                                onClick={this.props.onClearForm}
                        >
                            Clear
                        </Button>
                        <Button onClick={this.props.onClose}
                                aria-label="Close"
                                variant="contained"
                                color="secondary"
                        >
                            Close
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        );
    }
}

export default SubmissionMetaDialog;
