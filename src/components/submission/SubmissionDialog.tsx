// noinspection RequiredAttributes

import {
    Checkbox,
    FormControlLabel,
    TextField,
    Icon,
    IconButton,
    Button,
    Grid,
    Stack, styled, Paper, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import * as React from "react";
import FileUpload from "./FileUpload";
import { CloudUpload } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import HelpDialog from "../messages/HelpDialog";
import SubmissionHelpText from "../messages/Help/submission";
import { MessageLogEntry } from "../../states/messageLogState";
import MessageLog from "../messages/MessageLog";


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


const Item = styled (Paper) (({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing (1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


class SubmissionDialog extends React.Component<SubmissionDialogProps> {
    constructor(props: SubmissionDialogProps) {
        super (props);
    }

    handleSubmissionIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        this.props.onSubmissionIdChange (value);
    };

    handleOnPathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const path = event.target.value;

        this.props.onPathChange (path);
    };

    handlePublicationDateChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        this.props.onAllowPublicationChange (checked);
    };

    handleOndropDatafiles = (acceptedFiles: File[]) => {
        this.props.onDatafilesChange (acceptedFiles);
    };

    handleOndropDocfiles = (acceptedFiles: File[]) => {
        this.props.onDocfilesChange (acceptedFiles);
    };

    handleFileSubmit = () => {
        this.props.onFileSubmit ();
        if (this.props.submissionSucceeded) {
            this.props.onClearForm ();
            this.props.onClose ();
        }
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <Dialog
                open={this.props.show}
                onClose={this.props.onClose}
            >
                <DialogTitle>Create new Submission</DialogTitle>
                <DialogContent>
                    <Paper>
                        <Grid container>
                            <HelpDialog
                                open={this.props.helpDialogOpen}
                                onClose={this.props.closeHelpDialog}
                                title={'Submission Help'}
                            >
                                {SubmissionHelpText}
                            </HelpDialog>
                            <Grid item xs={12}>
                                <Stack direction={'column'}>
                                    <Item>
                                        <TextField
                                            required
                                            id="outlined-dense"
                                            label="Submission Label"
                                            margin="dense"
                                            variant="outlined"
                                            onChange={this.handleSubmissionIdChange}
                                            value={this.props.submissionIdValue}
                                        />
                                    </Item>
                                    <Item>
                                        <TextField
                                            required
                                            id="submission-path"
                                            label="Submission Path"
                                            margin="dense"
                                            variant="outlined"
                                            onChange={this.handleOnPathChange}
                                            value={this.props.pathValue}
                                        />
                                    </Item>
                                    <Item>
                                        <DatePicker
                                            value={this.props.publicationDate}
                                            onChange={this.props.onPublicationDateChange}
                                            renderInput={(params) => <TextField {...params} helperText={null}/>}
                                        />
                                    </Item>
                                    <Item>
                                        <FormControlLabel
                                            control={<Checkbox
                                                value={'publish'}
                                                checked={this.props.allowPublication}
                                                onChange={this.handlePublicationDateChange}
                                            />
                                            }
                                            label={'(By agreeing to the publication of the submitted in-situ data, you accept the general public being able to access these data. If you do not agree to the publication of your data then the data will be only visible to you and the OCDB administrators. Please refer to the Data Policy section of the User Manual for more information)'}
                                        />
                                    </Item>
                                    <Item>
                                        <FileUpload
                                            key={'drop-datafiles'}
                                            label={'Drag and drop DATA files here or click'}
                                            onChange={this.handleOndropDatafiles}
                                            files={this.props.dataFilesValue}
                                            onDropRejected={this.props.onDropRejected}
                                            acceptedFiles={['text/plain', 'text/csv', 'text/x-csv', 'application/vnd.ms-excel',
                                                'application/csv', 'application/x-csv', 'text/comma-separated-values',
                                                'text/x-comma-separated-values', 'text/tab-separated-values']}
                                        />
                                    </Item>
                                    <Item>
                                        <FileUpload
                                            key={'drop-docfiles'}
                                            onDropRejected={this.props.onDropRejected}
                                            label={'Drag and drop DOCUMENT files here or click'}
                                            onChange={this.handleOndropDocfiles}
                                            files={this.props.docFilesValue}
                                            acceptedFiles={undefined}
                                        />
                                    </Item>
                                </Stack>
                            </Grid>
                            <MessageLog
                                messages={this.props.submissionMessages}
                                hideMessage={this.props.onHideSubmissionMessages}
                            />
                        </Grid>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained"
                            color="secondary"
                        // className={classes.button}
                            onClick={this.handleFileSubmit}
                            sx={{'marginRight': 2}}
                    >
                        Submit
                        <CloudUpload/>
                    </Button>
                    <Button variant="contained"
                            color="secondary"
                        // className={classes.button}
                            onClick={this.props.onClearForm}
                            sx={{'marginRight': 2}}
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
                    <IconButton
                        onClick={this.props.openHelpDialog}
                    >
                        <Icon color={"secondary"}>
                            help
                        </Icon>
                    </IconButton>
                </DialogActions>
            </Dialog>
        );
    }
}


export default SubmissionDialog;
