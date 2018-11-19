import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Map } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton/IconButton";


interface DlgConfigProps {
    open: boolean;
    handleClickOpen: () => void;
    handleClose: () => void;
}


export default class DlgConfig extends React.Component<DlgConfigProps> {
    render() {
        return (
            <div>
                <IconButton color="inherit" onClick={this.props.handleClickOpen}>
                    <Map/>
                </IconButton>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Configuration</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Configure backend server address.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="server"
                            label="Backend Server"
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.handleClose} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}