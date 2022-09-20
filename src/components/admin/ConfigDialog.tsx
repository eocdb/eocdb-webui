import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

interface ConfigDialogProps {
    open: boolean;
    currentURL: string;
    handleClose: () => void;

    apiServerUrlChange: (url: string) => void;
}

interface ConfigDialogState {
    url: string;
}

class ConfigDialog extends React.Component<ConfigDialogProps, ConfigDialogState> {
    state = {
        url: '',
    };

    handleApiServerUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const v = event.target.value;
        this.setState({...this.state, url: v});
    };

    handleApiServerUrlSave = () => {
        this.props.apiServerUrlChange(this.state.url);
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Settings</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Configure backend server address.<br/>
                            <span style={{fontSize: "smaller"}}>
                                Current: {this.props.currentURL}
                            </span>
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="server"
                            label="Backend Server"
                            type="text"
                            fullWidth
                            onChange={this.handleApiServerUrlChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleApiServerUrlSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ConfigDialog;
