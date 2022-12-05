import * as React from "react";
import HelpDialog from "../messages/HelpDialog";
import SubmissionHelpText from "../messages/Help/submission";
import {
    Dialog,
    DialogTitle,
    IconButton,
    Icon,
    TextField,
    FormControlLabel,
    Checkbox,
    DialogActions,
    Button, styled, Paper, Stack, DialogContent
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



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
            <DialogTitle id="form-dialog-title">
                Update Submission Meta Data
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
            </DialogTitle>
            <DialogContent>
                <Stack direction={'column'} spacing={5}>
                    <Item>
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
                    </Item>
                    <Item>
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
                    </Item>
                    <Item>
                        <DatePicker
                            value={this.props.publicationDate}
                            onChange={this.props.onPublicationDateChange}
                            renderInput={(params) => <TextField {...params} helperText={null} />}
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
                            label={'Publish Data (Y)'}
                        />
                    </Item>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="contained"
                        color="secondary"
                        onClick={this.handleSubmit}
                >
                    Submit
                    <CloudUpload/>
                </Button>
                <Button variant="contained"
                        color="secondary"
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
            </Dialog>
        );
    }
}

export default SubmissionMetaDialog;
