// noinspection RequiredAttributes

import {
    Checkbox,
    FormControlLabel,
    TextField,
    Icon,
    IconButton,
    Button,
    Grid,
    Stack, styled, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Select, InputLabel, MenuItem, FormControl
} from "@mui/material";
import * as React from "react";
import FileUpload from "./FileUpload";
import { CloudUpload } from "@mui/icons-material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import HelpDialog from "../messages/HelpDialog";
import SubmissionHelpText from "../messages/Help/submission";
import { MessageLogEntry } from "../../states/messageLogState";
import MessageLog from "../messages/MessageLog";


interface CalibrationSubmissionDialogProps {
    show: boolean;
    onClose: () => void;

    // onSubmissionIdChange: (submissionId: string) => void;
    // submissionIdValue: string;

    onCalibrationPathChange: (path: string) => void;
    calibrationPathValue: string;

    // onAllowPublicationChange: (allowPublication: boolean) => void;
    // allowPublication: boolean;

    // onDatafilesChange: (acceptedFiles: File[]) => void;
    // dataFilesValue: File[];

    // onDocfilesChange: (acceptedFiles: File[]) => void;
    // docFilesValue: File[];

    // onCalibrationDateChange: (publicationDate: string | null) => void;

    // onFileSubmit: () => void;

    // onClearForm: () => void;

    // onDropRejected: (files: File[]) => void;

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


class CalibrationSubmissionDialog extends React.Component<CalibrationSubmissionDialogProps> {
    _radiometerSystem: string;
    _laboratory: string;
    _path: string;
    _submissionId: string;
    _calibrationDate: string | null;
    _dataFiles: File[];
    _docFiles: File[];

    constructor(props: CalibrationSubmissionDialogProps) {
        super(props);
        this._radiometerSystem = "";
        this._laboratory = "";
        this._path = "";
        this._submissionId = "";
        this._calibrationDate = null;
        this._dataFiles = [];
        this._docFiles = [];
    }

    handleSubmissionIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const value = event.target.value;
        // this.props.onSubmissionIdChange(value);
    };

    handleOnPathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const path = event.target.value;
        // this.props.onPathChange(path);
    };

    handlePublicationDateChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        // this.props.onAllowPublicationChange(checked);
    };

    handleOndropDatafiles = (acceptedFiles: File[]) => {
        // this.props.onDatafilesChange(acceptedFiles);
        this._dataFiles = acceptedFiles;
    };

    handleDataDropRejected = (rejectedFiles: File[]) => {
        console.log("Rejected data files:");
        console.log(rejectedFiles);
    }

    handleDocDropRejected = (rejectedFiles: File[]) => {
        console.log("Rejected document files:");
        console.log(rejectedFiles);
    }

    handleOndropDocfiles = (acceptedFiles: File[]) => {
        // this.props.onDocfilesChange(acceptedFiles);
    };

    handleFileSubmit = () => {
        // this.props.onFileSubmit();
        // if (this.props.submissionSucceeded) {
        //     this.props.onClearForm();
        //     this.props.onClose();
        // }
    };

    onChangeRadiometerSystem = (evt) => {
        const val = evt.target.value;
        this._radiometerSystem = val;
        this.assembleCalibrationPathAndId();
    }

    onInputLaboratory = (evt) => {
        const val = evt.target.value;
        this._laboratory = val;
        this.assembleCalibrationPathAndId();
    }

    onClearButtonClick = () => {
        this._radiometerSystem = "";
        this._laboratory = "";
        this._path = "";
        this._submissionId = "";
        this._calibrationDate = null;
        this.assembleCalibrationPathAndId();
    }

    assembleCalibrationPathAndId = () => {
        this.props.onCalibrationPathChange(this._radiometerSystem + "/" + this._laboratory);
        this._submissionId = this._radiometerSystem + "_" + this._laboratory;
    };

    onDateChange = (date) => {
        let value = date;
        this._calibrationDate = value;
        let currentValue = this.props.calibrationPathValue;
        // this.props.onCalibrationPathChange("__");
        this.props.onCalibrationPathChange(currentValue);
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <Dialog
                maxWidth={'sm'}
                open={this.props.show}
                onClose={this.props.onClose}
            >
                <DialogTitle>Create new Calibration Submission</DialogTitle>
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
                                        <FormControl>
                                            <InputLabel id="rad-sys">Radiometer System</InputLabel>
                                            <Select
                                                labelId="rad-sys"
                                                id="radiometer-sys"
                                                value={this._radiometerSystem}
                                                label="Radiometer System"
                                                onChange={evt => this.onChangeRadiometerSystem(evt)}
                                                // required
                                                // margin="dense"
                                                variant="outlined"
                                                // size={"small"}
                                                sx={{width: '350px'}}
                                            >
                                                <MenuItem value={"TriOS"}>TriOS-RAMSES</MenuItem>
                                                <MenuItem value={"Sea-Bird"}>Sea-Bird HyperOCR</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Item>
                                    <Item>
                                        <TextField
                                            required
                                            id="laboratory"
                                            label="Laboratory"
                                            margin="dense"
                                            variant="outlined"
                                            onInput={evt => this.onInputLaboratory(evt)}
                                            value={this._laboratory}
                                            size={"small"}
                                            sx={{width: '350px'}}
                                        />
                                    </Item>
                                    <Item>
                                        <TextField
                                            id="calibration-path"
                                            label="Calibration Path (read only)"
                                            margin="dense"
                                            variant="outlined"
                                            onChange={this.handleOnPathChange}
                                            value={this.props.calibrationPathValue}
                                            disabled={true}
                                            size={"small"}
                                            sx={{width: '350px'}}
                                            // inputProps={{readOnly: "readOnly"}}
                                        />
                                    </Item>
                                    <Item>
                                        <TextField
                                            required
                                            id="calibration-id"
                                            label="Calibration ID"
                                            margin="dense"
                                            variant="outlined"
                                            onChange={this.handleSubmissionIdChange}
                                            value={this._submissionId}
                                            size={"small"}
                                            sx={{width: '350px'}}
                                        />
                                    </Item>
                                    <Item>
                                        <DatePicker
                                            value={this._calibrationDate}
                                            // value={this.props.calibrationDate}
                                            label="Calibration Date"
                                            onChange={this.onDateChange}
                                            // onChange={this.props.onCalibrationDateChange}
                                            renderInput={(params) => <TextField
                                                required
                                                margin={"dense"}
                                                sx={{width: '350px'}}
                                                size={"small"} {...params} helperText={null}/>}
                                        />
                                    </Item>
                                    <Item>
                                        <FileUpload
                                            key={'drop-datafiles'}
                                            label={'Drag and drop SEABASS data files here or click to select files'}
                                            files={this._dataFiles}
                                            // files={this.props.dataFilesValue}
                                            onChange={this.handleOndropDatafiles}
                                            onDropRejected={this.handleDataDropRejected}
                                            // onDropRejected={this.props.onDropRejected}
                                            acceptedFiles={['text/plain', 'text/csv', 'text/x-csv', 'application/vnd.ms-excel',
                                                'application/csv', 'application/x-csv', 'text/comma-separated-values',
                                                'text/x-comma-separated-values', 'text/tab-separated-values']}
                                        />
                                    </Item>
                                    <Item>
                                        <FileUpload
                                            key={'drop-docfiles'}
                                            label={'Drag and drop DOCUMENT files here or click to select files'}
                                            files={this._docFiles}
                                            onChange={this.handleOndropDocfiles}
                                            onDropRejected={this.handleDocDropRejected}
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
                    <Button disabled={true}
                            variant="contained"
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
                            onClick={this.onClearButtonClick}
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


export default CalibrationSubmissionDialog;
