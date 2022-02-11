import { Checkbox, FormControlLabel, TextField, Icon, IconButton, Button, Grid } from "@mui/material";
import * as React from "react";
import FileUpload from "./FileUpload";
import { CloudUpload } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import HelpDialog from "../messages/HelpDialog";
import SubmissionHelpText from "../messages/Help/submission";
import { MessageLogEntry } from "../../states/messageLogState";
import MessageLog from "../messages/MessageLog";


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
// });


interface SubmissionDialogProps {
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

    onDropRejected: (files: File[]) => void;

    helpDialogOpen: boolean;
    openHelpDialog: () => void;
    closeHelpDialog: () => void;
    submissionSucceeded: boolean;
    submissionMessages: MessageLogEntry[];
    onHideSubmissionMessages: (id: number) => void;
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

        return (
            <div>
                <Grid container>
                    <IconButton
                        onClick={this.props.openHelpDialog}
                    >
                        <Icon color={"secondary"}>
                            help
                        </Icon>
                    </IconButton>
                    <Button variant="contained"
                            color="secondary"
                            // className={classes.button}
                            onClick={this.handleFileSubmit}
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
                            label={'(By agreeing to the publication of the submitted in-situ data, you accept the general public being able to access these data. If you do not agree to the publication of your data then the data will be only visible to you and the OCDB administrators. Please refer to the Data Policy section of the User Manual for more information)'}
                        />
                    </Grid>
                    <Grid item>
                        <FileUpload
                            key={'drop-datafiles'}
                            label={'Drag and drop DATA files here or click'}
                            onChange={this.handleOndropDatafiles}
                            files={this.props.dataFilesValue}
                            onDropRejected={this.props.onDropRejected}
                            acceptedFiles={['text/plain', 'text/csv', 'text/x-csv','application/vnd.ms-excel',
                                'application/csv', 'application/x-csv', 'text/comma-separated-values',
                                'text/x-comma-separated-values', 'text/tab-separated-values']}
                        />
                    </Grid>
                    <Grid item>
                        <FileUpload
                            key={'drop-docfiles'}
                            onDropRejected={this.props.onDropRejected}
                            label={'Drag and drop DOCUMENT files here or click'}
                            onChange={this.handleOndropDocfiles}
                            files={this.props.docFilesValue}
                            acceptedFiles={undefined}
                        />
                    </Grid>
                </Grid>
                <MessageLog
                    messages={this.props.submissionMessages}
                    hideMessage={this.props.onHideSubmissionMessages}
                />
            </div>
        );
    }
}


export default SubmissionDialog;
