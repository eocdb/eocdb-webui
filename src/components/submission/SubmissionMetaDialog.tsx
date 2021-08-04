import { Checkbox, FormControlLabel, Icon, IconButton, Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import * as classNames from "classnames";
import { CloudUpload } from "@material-ui/icons";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid";
// import { DatePicker } from "material-ui-pickers";
import HelpDialog from "../messages/HelpDialog";
import SubmissionHelpText from "../messages/Help/submission";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";


const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(),
    },
    textField: {
        width: 200,
        marginTop: theme.spacing() / 2,
        marginRight: theme.spacing() / 2,
    },
    dense: {
        marginTop: 16,
    },
    instructions: {
        marginTop: theme.spacing(),
        marginBottom: theme.spacing(),
    },
    dialogContent: {
        marginLeft: theme.spacing() * 4,
        marginRight: theme.spacing() * 4,
        marginTop: theme.spacing() * 4,
        marginBottom: theme.spacing() * 4,
    },
    appBar: {
        position: 'relative',
    },
});


interface SubmissionMetaDialogProps extends WithStyles<typeof styles> {
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
        const {classes} = this.props;

        return (
            <Dialog
                open={this.props.show}
                onClose={this.props.onClose}
            >
                <div className={classes.dialogContent}>
                    <DialogTitle id="form-dialog-title">Update Submission Meta Data</DialogTitle>

                    <Grid container justify={"flex-end"}>
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
                    <Grid container justify={"flex-start"} spacing={10} direction={"column"}>
                        <Grid item>
                            <TextField
                                required
                                id="outlined-dense"
                                label="Submission Label"
                                className={classNames(classes.textField)}
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
                                className={classNames(classes.textField)}
                                margin="dense"
                                variant="outlined"
                                onChange={this.handleOnPathChange}
                                value={this.props.pathValue}
                            />
                        </Grid>
                        <Grid item>
                            {/*<DatePicker*/}
                            {/*    keyboard*/}
                            {/*    clearable*/}
                            {/*    variant={"outlined"}*/}
                            {/*    label={'Publication Date'}*/}
                            {/*    format="dd/MM/yyyy"*/}
                            {/*    animateYearScrolling={false}*/}
                            {/*    value={this.props.publicationDate}*/}
                            {/*    onChange={this.props.onPublicationDateChange}*/}

                            {/*    className={classes.textField}*/}
                            {/*/>*/}
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
                    <DialogActions className={classes.appBar}>
                        <Button variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={this.handleSubmit}
                        >
                            Submit
                            <CloudUpload/>
                        </Button>
                        <Button variant="contained"
                                color="secondary"
                                className={classes.button}
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

export default withStyles(styles)(SubmissionMetaDialog);
