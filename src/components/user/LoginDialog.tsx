import * as React from 'react';
import {
    CircularProgress,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    FormControl, InputLabel, Input, InputAdornment, IconButton, Button, DialogActions
} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";

// const styles = (theme: Theme) => createStyles(
//     {
//         root: {
//             display: 'flex',
//             flexWrap: 'wrap',
//         },
//         margin: {
//             margin: theme.spacing.unit,
//         },
//         withoutLabel: {
//             marginTop: theme.spacing.unit * 3,
//         },
//         textField: {
//             flexBasis: 200,
//         },
//     });
//

interface LoginDialogProps {
    open: boolean;
    userName: string;
    userLoginError: string | null;
    userLoginInProgress: boolean;

    loginUser: (name: string, password: string) => void;
    logoutUser: () => void;

    openRegistrationDialog: () => void;
    openChangeUserLoginDialog: () => void;
    closeLoginDialog: () => void;
}

interface LoginDialogState {
    showPassword: boolean;
    userName: string;
    password: string;
}

class LoginDialog extends React.Component<LoginDialogProps, LoginDialogState> {

    state = {
        showPassword: false,
        userName: '',
        password: '',
    };

    private handleDialogClose = () => {
        // ?
    };

    private handleLogin = () => {
        this.props.loginUser(this.state.userName, this.state.password);
        this.setState({
            userName: '',
            password: '',
            showPassword: false,
        });
        this.props.closeLoginDialog();
    };

    private handleLogout = () => {
        this.props.logoutUser();
        this.setState({
            userName: '',
            password: '',
            showPassword: false,
        });
        this.props.closeLoginDialog();
    };

    private handleCancel = () => {
        this.setState({
            userName: '',
            password: '',
            showPassword: false,
        });
        this.props.closeLoginDialog();
    };

    private handleRegister = () => {
        this.props.closeLoginDialog();
        this.props.openRegistrationDialog();
    };

    private handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({userName: event.target.value});
    };

    private handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password: event.target.value});
    };

    private handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    handlePasswordKeyPressed = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleLogin();
        }

    };

    render() {
        const {open, userLoginError, userLoginInProgress,} = this.props;
        const {userName, password, showPassword} = this.state;

        let progress = null;
        if (userLoginInProgress) {
            progress = <CircularProgress size={24}/>;
        }

        let error = null;
        if (userLoginError) {
            error = (<Typography color="error" align="right" variant="body2">
                {userLoginError}
            </Typography>);
        }

        return (
            <Dialog
                open={open}
                onClose={this.handleDialogClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.props.userName?'Hello ' + this.props.userName + '. Here you can logout ' +
                            'or change your password.':'Please enter your login details here or register for a new account.'}

                    </DialogContentText>
                    <TextField
                        // className={classNames(classes.margin, classes.textField)}
                        autoFocus
                        id="name"
                        label="User Name or E-mail Address"
                        type="email"
                        fullWidth
                        value={userName}
                        disabled={this.props.userName !== ''}
                        onChange={this.handleUserNameChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                        <Input
                            id="adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={this.handlePasswordChange}
                            onKeyPress={this.handlePasswordKeyPressed}
                            disabled={this.props.userName !== ''}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {progress}
                    {error}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                        Close
                    </Button>
                    <Button disabled={this.props.userName === ''} onClick={this.handleLogout} color="primary">
                        Logout
                    </Button>
                    <Button disabled={this.props.userName !== ''}  onClick={this.handleLogin} color="primary">
                        Login
                    </Button>
                    <Button disabled={this.props.userName === ''} onClick={this.props.openChangeUserLoginDialog} color="secondary">
                        Change Password
                    </Button>
                    <Button onClick={this.handleRegister} color="secondary">
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default LoginDialog;
