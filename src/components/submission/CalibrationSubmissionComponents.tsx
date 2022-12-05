import React, { useContext, useState } from "react";
import { postMessage } from "../../actions/messageLogActions";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    Icon,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    styled,
    TextField, Typography
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import HelpDialog from "../messages/HelpDialog";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FileUpload from "./FileUpload";
import MessageLog from "../messages/MessageLog";
import { useDispatch } from "react-redux";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: "5px 10px 2px 10px",
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: '0px 0px 0px 0px'
}));

// the default object needed by "React.createContext()"
const defaultSharedCalibrationContext = {
    showDialog: false,

    dispatchShowDialog(value: any): void {
    },
}

export const SharedCalibrationContext = React.createContext(defaultSharedCalibrationContext);

/**
 * The context provider to be imported and must be used in an anchor component which uses
 * both components of this file (the {@link OpenNewCalibrationDialogButton} component and
 * the {@link CalibrationSubmissionDialog} component) in any depth of its child components.
 * @param children
 * @constructor
 */
export const CalibrationContextProvider = ({children}) => {

    const [showDialog, dispatchShowDialog] = useState(defaultSharedCalibrationContext.showDialog);

    const contextValue = {
        showDialog,
        dispatchShowDialog
    };
    return (
        <SharedCalibrationContext.Provider value={contextValue}>
            {children}
        </SharedCalibrationContext.Provider>
    )
}

/**
 * The OpenNewCalibrationDialogButton JSX component
 * @constructor
 */
export function OpenNewCalibrationDialogButton() {
    const {showDialog, dispatchShowDialog} = useContext(SharedCalibrationContext);

    return (
        <Button onClick={() => dispatchShowDialog(true)}
                variant="contained"
                color="secondary"
        >
            New Calibration Submission &nbsp;
            <CloudUpload/>
        </Button>
    );
}

/**
 * The CalibrationSubmissionDialog JSX component
 * @constructor
 */
export function CalibrationSubmissionDialog(props) {
    const {showDialog, dispatchShowDialog} = useContext(SharedCalibrationContext);

    if (!showDialog) {
        return null;
    }

    const [radiometerSystem, dispatchRadiometerSystem] = useState("");
    const [laboratory, dispatchLaboratory] = useState("");
    const [path, dispatchPath] = useState("");
    const [calibrationId, dispatchCalibrationId] = useState("");
    const [calibrationDate, dispatchCalibrationDate] = useState(null);
    const [dataFiles, dispatchDataFiles] = useState([]); // File[]
    const [docFiles, dispatchDocFiles] = useState([]); // File[]
    const [showHelpDialog, dispatchShowHelpDialog] = useState(false);

    const onChangeRadiometerSystem = (evt) => {
        const val = evt.target.value;
        dispatchRadiometerSystem(val);
        assembleCalibrationPathAndId(val, undefined);
    }

    const onInputLaboratory = (evt) => {
        const val = evt.target.value;
        dispatchLaboratory(val);
        assembleCalibrationPathAndId(undefined, val);
    }

    function assembleCalibrationPathAndId(radio?: string, labor?: string) {
        const rad = radio ? radio : radiometerSystem;
        const lab = labor ? labor : laboratory;
        dispatchPath(() => rad + "/" + lab);
        dispatchCalibrationId(() => rad + "_" + lab);
    }

    const dispatch = useDispatch();

    const onSubmitButtonClick = () => {
        dispatch({
            ...postMessage(
                'error',
                'The submission of calibration data is currently not implemented.')
        });
    }

    const onClearButtonClick = () => {
        dispatchRadiometerSystem("")
        dispatchLaboratory("")
        dispatchPath("")
        dispatchCalibrationId("")
        dispatchCalibrationDate(null)
        dispatchDataFiles([])
        dispatchDocFiles([])
    }

    function onChangeDataFiles(files: File[]) {
        if (files) {
            let newFiles = [...dataFiles, ...files]
            dispatchDataFiles(newFiles)
        }
    }

    function onChangeDocFiles(files: File[]) {
        if (files) {
            let newFiles = [...docFiles, ...files]
            dispatchDocFiles(newFiles)
        }
    }

    return (
        <Dialog
            maxWidth={'sm'}
            open={showDialog}
            onClose={() => dispatchShowDialog(false)}
        >
            <DialogTitle>Create new Calibration Submission</DialogTitle>
            <DialogContent>
                <Paper style={{border: 'solid 1px lightgray'}}>
                    <Grid container>
                        <HelpDialog
                            open={showHelpDialog}
                            onClose={() => dispatchShowHelpDialog(false)}
                            title={'Calibration Submission Help'}
                        >
                            {CalibrationSubmissionHelpText}
                        </HelpDialog>
                        <Grid item xs={12}>
                            <Stack direction={'column'} style={{alignItems: 'center'}}>
                                <FormControl required size={'small'} style={{marginTop: '8px'}}>
                                    <InputLabel id="rad-sys">Radiometer System</InputLabel>
                                    <Select
                                        labelId="rad-sys"
                                        id="radiometer-sys"
                                        value={radiometerSystem}
                                        label="Radiometer system"
                                        onChange={onChangeRadiometerSystem}
                                        margin="dense"
                                        variant="outlined"
                                        sx={{width: '350px'}}
                                        style={{textAlign: 'left'}}
                                    >
                                        <MenuItem value={"TriOS"}>TriOS-RAMSES</MenuItem>
                                        <MenuItem value={"Sea-Bird"}>Sea-Bird HyperOCR</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    required
                                    id="laboratory"
                                    label="Laboratory"
                                    margin="dense"
                                    variant="outlined"
                                    onInput={onInputLaboratory}
                                    value={laboratory}
                                    size={"small"}
                                    sx={{width: '350px'}}
                                />
                                <TextField
                                    id="calibration-path"
                                    label="Calibration path (read only)"
                                    margin="dense"
                                    variant="outlined"
                                    value={path}
                                    disabled={true}
                                    size={"small"}
                                    sx={{width: '350px'}}
                                />
                                <TextField
                                    required
                                    id="calibration-id"
                                    label="Unique calibration ID"
                                    margin="dense"
                                    variant="outlined"
                                    onChange={evt => dispatchCalibrationId(evt.target.value)}
                                    value={calibrationId}
                                    size={"small"}
                                    sx={{width: '350px'}}
                                />
                                <DatePicker
                                    value={calibrationDate}
                                    label="Calibration date (mm/dd/yyyy)"
                                    onChange={dispatchCalibrationDate}
                                    renderInput={(params) => <TextField
                                        required
                                        margin={"dense"}
                                        sx={{width: '350px'}}
                                        size={"small"} {...params} helperText={null}/>}
                                />
                                <Item>
                                    <div style={{fontSize: '16px', textAlign: 'left', padding: '4 10'}}>
                                        Mandatory fields are marked with a star (*)<br/><br/>
                                        Drag and drop calibration and characterisation files as well as additional
                                        documentation files to the corresponding drop box.
                                        Alternatively, you can click the drop boxes to select files via a file browser
                                        dialog.
                                    </div>
                                    <FileUpload
                                        key={'drop-datafiles'}
                                        label={'Drop box for cal/char files [ *.txt , *.dat ].'}
                                        files={dataFiles}
                                        onChange={onChangeDataFiles}
                                        onDropRejected={() => {
                                        }}
                                        acceptedFiles={{'text/plain': ['.txt', '.dat']}}
                                    />
                                </Item>
                                <Item>
                                    <div style={{
                                        fontSize: '16px', textAlign: 'left', padding: '4 10',
                                        height: '0px', overflow: 'clip'
                                    }}>
                                        A Long text to ensure full with in item Area.
                                        The div element has a height of 0.
                                        The overflow of the long text is clipped
                                    </div>
                                    <FileUpload
                                        key={'drop-docfiles'}
                                        label={'Drop box for DOCUMENT files [ any file type ].'}
                                        files={docFiles}
                                        onChange={onChangeDocFiles}
                                        onDropRejected={() => {
                                        }}
                                        acceptedFiles={undefined}
                                    />
                                    <div style={{height: '4px'}}></div>
                                </Item>
                            </Stack>
                        </Grid>
                        <MessageLog
                            messages={props.submissionMessages}
                            hideMessage={props.onHideSubmissionMessages}
                        />
                    </Grid>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={!(radiometerSystem && laboratory && calibrationId && dataFiles && dataFiles.length > 0)}
                    variant="contained"
                    color="secondary"
                    onClick={onSubmitButtonClick}
                    sx={{'marginRight': 2}}
                >
                    Submit&nbsp;
                    <CloudUpload/>
                </Button>
                <Button variant="contained"
                        color="secondary"
                        onClick={onClearButtonClick}
                        sx={{'marginRight': 2}}
                >
                    Clear
                </Button>
                <Button onClick={() => dispatchShowDialog(false)}
                        aria-label="Close"
                        variant="contained"
                        color="secondary"
                >
                    Close
                </Button>
                <IconButton
                    onClick={() => dispatchShowHelpDialog(true)}
                >
                    <Icon color={"secondary"}>
                        help
                    </Icon>
                </IconButton>
            </DialogActions>
        </Dialog>
    );
}

const CalibrationSubmissionHelpText = (
    <div>
        <Typography variant={"h5"} gutterBottom>
            Unique calibration ID
        </Typography>
        <Typography variant={"body1"} gutterBottom>
            Calibration ID is a unique identifier for your calibration submission. Please don't use white spaces.
        </Typography>
        <Typography variant={"h5"} gutterBottom>
            Calibration date
        </Typography>
        <Typography variant={"body1"} gutterBottom>
            Please enter the date on which the calibration was performed.
        </Typography>
    </div>
);
