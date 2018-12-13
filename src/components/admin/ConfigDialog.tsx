import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme, WithStyles } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({});

interface ConfigDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    handleClose: () => void;

    apiServerConfigChange: (url: string, auth: string) => void;
}

interface ConfigDialogState {
    url: string;
    auth: string;
}

class ConfigDialog extends React.Component<ConfigDialogProps, ConfigDialogState> {
    state = {
        url: '',
        auth: '',
    };

    handleApiServerUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const v = event.target.value;
        this.setState({...this.state, url: v});
    };

    handleApiServerAuthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const v = event.target.value;
        this.setState({...this.state, auth: v});
    };

    handleApiServerConfigSave = () => {
        this.props.apiServerConfigChange(this.state.url, this.state.auth);
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
                            Please enter the server URL and and API authorisation string.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="server"
                            label="Server URL"
                            type="text"
                            fullWidth
                            onChange={this.handleApiServerUrlChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="auth"
                            label="API Authorisation"
                            type="text"
                            fullWidth
                            onChange={this.handleApiServerAuthChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleApiServerConfigSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(ConfigDialog);
