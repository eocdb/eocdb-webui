import * as React from 'react';
import { Theme, WithStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Input from "@material-ui/core/Input/Input";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import classNames from "classnames";
import createStyles from "@material-ui/core/styles/createStyles";


const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
    },
});


interface LoginDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    nameOrEmail?: string;

    loginUser: (nameOrEmail: string, password: string) => void;
    openUserRegistrationDialog: () => void;
    closeUserLoginDialog: () => void;
}

interface LoginDialogState {
    showPassword: boolean;
    nameOrEmail: string;
    password: string;
}

export class LoginDialog extends React.Component<LoginDialogProps, LoginDialogState> {

    state = {
        showPassword: false,
        nameOrEmail: "",
        password: "",
    };

    static getDerivedStateFromProps(props: LoginDialogProps, state: LoginDialogState): LoginDialogState {
        return {...state, nameOrEmail: props.nameOrEmail || ""};
    }

    private handleDialogClose = () => {
        // ?
    };

    private handleLogin = () => {
        this.props.loginUser(this.state.nameOrEmail, this.state.password);
    };

    private handleCancel = () => {
        this.props.closeUserLoginDialog();
    };

    private handleRegister = () => {
        this.props.closeUserLoginDialog();
        this.props.openUserRegistrationDialog();
    };

    private handleNameOrEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({nameOrEmail: event.target.value});
    };

    private handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({password: event.target.value});
    };

    private handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    render() {
        const {classes, open} = this.props;
        const {nameOrEmail, password, showPassword} = this.state;
        return (
            <Dialog
                open={open}
                onClose={this.handleDialogClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your login details here or register for a new account.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="User Name or Email Address"
                        type="email"
                        fullWidth
                        value={nameOrEmail}
                        onChange={this.handleNameOrEmailChange}
                    />
                    <FormControl className={classNames(classes.margin, classes.textField)}>
                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                        <Input
                            id="adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={this.handlePasswordChange}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleLogin} color="primary">
                        Login
                    </Button>
                    <Button onClick={this.handleRegister} color="secondary">
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
