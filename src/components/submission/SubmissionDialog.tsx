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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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


const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


class SubmissionDialog extends React.Component<SubmissionDialogProps> {
    _affiliation: string;
    _experiment: string;
    _cruise: string;

    constructor(props: SubmissionDialogProps) {
        super(props);
        this._affiliation = "";
        this._experiment = "";
        this._cruise = "";
    }

    handleSubmissionIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        this.props.onSubmissionIdChange(value);
    };

    handleOnPathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const path = event.target.value;

        // this.props.onPathChange(path);
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
        if (this.props.submissionSucceeded) {
            this.props.onClearForm();
            this.props.onClose();
        }
    };

    onInputAffiliation = (evt) => {
        const val = evt.target.value;
        this._affiliation = val;
        this.assembleSubmissionPathAndId();
    }

    onInputExperiment = (evt) => {
        const val = evt.target.value;
        this._experiment = val;
        this.assembleSubmissionPathAndId();
    }

    onInputCruise = (evt) => {
        const val = evt.target.value;
        this._cruise = val;
        this.assembleSubmissionPathAndId();
    }

    onClearButtonClick = () => {
        this._affiliation = "";
        this._experiment = "";
        this._cruise = "";
        this.assembleSubmissionPathAndId();
        this.props.onClearForm();
    }

    assembleSubmissionPathAndId = () => {
        this.props.onPathChange(this._affiliation + "/" + this._experiment + "/" + this._cruise);
        this.props.onSubmissionIdChange(this._affiliation + "_" + this._experiment + "_" + this._cruise);
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <Dialog
                maxWidth={'md'}
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
                            <Grid item xs={6}>
                                <Stack direction={'column'}>
                                    <Item>
                                        <TextField
                                            required
                                            id="affiliation"
                                            label="Affiliation"
                                            margin="dense"
                                            variant="outlined"
                                            onInput={evt => this.onInputAffiliation(evt)}
                                            value={this._affiliation}
                                            size={"small"}
                                            sx={{width: '40ch'}}
                                        />
                                    </Item>
                                    <Item>
                                        <TextField
                                            required
                                            id="experiment"
                                            label="Experiment"
                                            margin="dense"
                                            variant="outlined"
                                            onInput={evt => this.onInputExperiment(evt)}
                                            value={this._experiment}
                                            size={"small"}
                                            sx={{width: '40ch'}}
                                        />
                                    </Item>
                                    <Item>
                                        <TextField
                                            required
                                            id="cruise"
                                            label="Cruise"
                                            margin="dense"
                                            variant="outlined"
                                            onInput={evt => this.onInputCruise(evt)}
                                            value={this._cruise}
                                            size={"small"}
                                            sx={{width: '40ch'}}
                                        />
                                    </Item>
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack direction={"column"}>
                                    <Item>
                                        <TextField
                                            id="submission-path"
                                            label="Submission Path"
                                            margin="dense"
                                            variant="outlined"
                                            onChange={this.handleOnPathChange}
                                            value={this.props.pathValue}
                                            disabled={true}
                                            size={"small"}
                                            sx={{width: '40ch'}}
                                        />
                                    </Item>
                                    <Item>
                                        <TextField
                                            required
                                            id="outlined-dense"
                                            label="Submission Label"
                                            margin="dense"
                                            variant="outlined"
                                            onChange={this.handleSubmissionIdChange}
                                            value={this.props.submissionIdValue}
                                            size={"small"}
                                            sx={{width: '40ch'}}
                                        />
                                    </Item>
                                    <Item>
                                        <DatePicker
                                            value={this.props.publicationDate}
                                            label="Publication Date"
                                            onChange={this.props.onPublicationDateChange}
                                            renderInput={(params) => <TextField
                                                required
                                                margin={"dense"}
                                                sx={{width: '40ch'}}
                                                size={"small"} {...params} helperText={null}/>}
                                        />
                                    </Item>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction={"column"}>
                                    <Item>
                                        <FormControlLabel
                                            control={<Checkbox
                                                value={'publish'}
                                                checked={this.props.allowPublication}
                                                onChange={this.handlePublicationDateChange}
                                            />
                                            }
                                            label={'By agreeing to the publication of the submitted in-situ data, you accept the general public being able to access these data. If you do not agree to the publication of your data then the data will be only visible to you and the OCDB administrators. Please refer to the Data Policy section of the User Manual for more information.'}
                                        />
                                    </Item>
                                    <Item>
                                        <FileUpload
                                            key={'drop-datafiles'}
                                            label={'Drag and drop DATA files here or click to select files'}
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
                                            label={'Drag and drop DOCUMENT files here or click to select files'}
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
                        Submit&nbsp;
                        <CloudUpload/>
                    </Button>
                    <Button variant="contained"
                            color="secondary"
                        // className={classes.button}
                            onClick={this.onClearButtonClick}
                        // onClick={this.props.onClearForm}
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
