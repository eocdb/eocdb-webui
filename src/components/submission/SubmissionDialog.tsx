import { Checkbox, FormControlLabel, Icon, IconButton, Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import * as React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import FileUpload from "./FileUpload";
import TextField from "@material-ui/core/TextField";
import * as classNames from "classnames";
import { CloudUpload } from "@material-ui/icons";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid";
import { DatePicker } from "material-ui-pickers";
import HelpDialog from "../messages/HelpDialog";
import SubmissionHelpText from "../messages/Help/submission";


const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    textField: {
        width: 200,
        marginTop: theme.spacing.unit / 2,
        marginRight: theme.spacing.unit / 2,
    },
    dense: {
        marginTop: 16,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});


interface SubmissionDialogProps extends WithStyles<typeof styles> {
    show: boolean;
    onClose: () => void;

    onSubmissionIdChange: (submissionId: string) => void;
    submissionIdValue: string;

    onPathChange: (path: string) => void;
    pathValue: string;

    onAllowPublicationChange: (allowPublication: boolean) => void;
    allowPublication: boolean;

    onDatafilesChange: (acceptedFiles: File[]) => void;
    dataFilesValue: File[];

    onDocfilesChange: (acceptedFiles: File[]) => void;
    docFilesValue: File[];

    onPublicationDateChange: (publicationDate: string | null) => void;
    publicationDate: string | null;

    onFileSubmit: () => void;

    onClearForm: () => void;

    helpDialogOpen: boolean;
    openHelpDialog: () => void;
    closeHelpDialog: () => void;
    submissionSucceeded: boolean;
}


class SubmissionDialog extends React.Component<SubmissionDialogProps> {
    constructor(props: SubmissionDialogProps) {
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

    handleOndropDatafiles = (acceptedFiles: File[]) => {
        this.props.onDatafilesChange(acceptedFiles);
    };

    handleOndropDocfiles = (acceptedFiles: File[]) => {
        this.props.onDocfilesChange(acceptedFiles);
    };

    handleFileSubmit = () => {
        this.props.onFileSubmit();
        if(this.props.submissionSucceeded) {
            this.props.onClearForm();
            this.props.onClose();
        }
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify={"flex-end"}>
                    <IconButton
                        onClick={this.props.openHelpDialog}
                    >
                        <Icon color={"secondary"}>
                            help
                        </Icon>
                    </IconButton>
                    <Button variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={this.handleFileSubmit}
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
                    <HelpDialog
                        open={this.props.helpDialogOpen}
                        onClose={this.props.closeHelpDialog}
                        title={'Submission Help'}
                    >
                        {SubmissionHelpText}
                    </HelpDialog>
                </Grid>
                <Grid container justify={"flex-start"} spacing={16} direction={"column"}>
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
                        <DatePicker
                            keyboard
                            clearable
                            variant={"outlined"}
                            label={'Publication Date'}
                            format="dd/MM/yyyy"
                            animateYearScrolling={false}
                            value={this.props.publicationDate}
                            onChange={this.props.onPublicationDateChange}

                            className={classes.textField}
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
                    <Grid item>
                        <FileUpload
                            key={'drop-datafiles'}
                            label={'Drag and drop DATA files here or click'}
                            onChange={this.handleOndropDatafiles}
                            files={this.props.dataFilesValue}
                            acceptedFiles={['text/plain', 'text/csv', 'text/x-csv','application/vnd.ms-excel',
                                'application/csv', 'application/x-csv', 'text/comma-separated-values',
                                'text/x-comma-separated-values', 'text/tab-separated-values']}
                        />
                    </Grid>
                    <Grid item>
                        <FileUpload
                            key={'drop-docfiles'}
                            label={'Drag and drop DOCUMENT files here or click'}
                            onChange={this.handleOndropDocfiles}
                            files={this.props.docFilesValue}
                            acceptedFiles={undefined}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default withStyles(styles)(SubmissionDialog);