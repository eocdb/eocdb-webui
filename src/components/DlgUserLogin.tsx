import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AccountCircle } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton/IconButton";


interface DlgUserLoginProps {
    open: boolean;
    handleClickOpen: () => void;
    handleClose: () => void;
}


export default class DlgUserLogin extends React.Component<DlgUserLoginProps> {
    render() {
        return (
            <div>
                <IconButton color="inherit" onClick={this.props.handleClickOpen}>
                    <AccountCircle/>
                </IconButton>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter user name and password.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="user"
                            label="User Name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="passwd"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.handleClose} color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}