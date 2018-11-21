import * as React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Input from '@material-ui/core/Input/Input';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import IconButton from '@material-ui/core/IconButton/IconButton';
import classNames from 'classnames';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) => createStyles(
    {
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
    userName: string;
    userLoginError: string | null;
    userLoginInProgress: boolean;

    loginUser: (name: string, password: string) => void;
    openRegistrationDialog: () => void;
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

    // static getDerivedStateFromProps(props: LoginDialogProps, state: LoginDialogState): LoginDialogState {
    //     console.log(props);
    //     return {...state, userName: props.userName || ''};
    // }

    private handleDialogClose = () => {
        // ?
    };

    private handleLogin = () => {
        this.props.loginUser(this.state.userName, this.state.password);
        this.props.closeLoginDialog();
    };

    private handleCancel = () => {
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

    render() {
        const {classes, open, userLoginError, userLoginInProgress,} = this.props;
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
                        Please enter your login details here or register for a new account.
                    </DialogContentText>
                    <TextField
                        className={classNames(classes.margin, classes.textField)}
                        autoFocus
                        id="name"
                        label="User Name or E-mail Address"
                        type="email"
                        fullWidth
                        value={userName}
                        onChange={this.handleUserNameChange}
                    />
                    <FormControl className={classNames(classes.margin, classes.textField)} fullWidth>
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
                    {progress}
                    {error}
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

export default withStyles(styles)(LoginDialog);
