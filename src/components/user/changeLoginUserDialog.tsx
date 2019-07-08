import * as React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
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


interface ChangeLoginUserDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    userName: string;
    userLoginError: string | null;

    onLoginUserChange: (username: string, oldPassword: string, newPassword1: string, newPassword2: string) => void;

    onChangeUserLoginDialogClose: () => void;
}

interface ChangeLoginUserDialogState {
    showPassword: boolean;
    oldPassword: string;
    newPassword1: string;
    newPassword2: string;
}

class ChangeLoginUserDialog extends React.Component<ChangeLoginUserDialogProps, ChangeLoginUserDialogState> {

    state = {
        showPassword: false,
        oldPassword: '',
        newPassword1: '',
        newPassword2: '',
    };

    private handleChangePassword = () => {
        this.props.onLoginUserChange(this.props.userName, this.state.oldPassword, this.state.newPassword1, this.state.newPassword2);
        this.setState({
            showPassword: false,
            oldPassword: '',
            newPassword1: '',
            newPassword2: '',        });
        this.props.onChangeUserLoginDialogClose();
    };

    private handleCancel = () => {
        this.setState({
            showPassword: false,
            oldPassword: '',
            newPassword1: '',
            newPassword2: '',        });
        this.props.onChangeUserLoginDialogClose();
    };

    private handleOldPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({oldPassword: event.target.value});
    };

    private handleNewPassword1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({newPassword1: event.target.value});
    };

    private handleNewPassword2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({newPassword2: event.target.value});
    };

    private handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    handlePasswordKeyPressed = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleChangePassword();
        }

    };

    render() {
        const {classes, open, userLoginError } = this.props;
        const {oldPassword, newPassword1, newPassword2, showPassword} = this.state;

        let error = null;
        if (userLoginError) {
            error = (<Typography color="error" align="right" variant="body2">
                {userLoginError}
            </Typography>);
        }

        return (
            <Dialog
                open={open}
                onClose={this.handleCancel}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Dear {this.props.userName?this.props.userName:'unknown'},
                        please enter your new password information.
                    </DialogContentText>
                    <FormControl className={classNames(classes.margin, classes.textField)} fullWidth>
                        <InputLabel htmlFor="adornment-password">Old Password</InputLabel>
                        <Input
                            id="adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={oldPassword}
                            onChange={this.handleOldPasswordChange}
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
                    <FormControl className={classNames(classes.margin, classes.textField)} fullWidth>
                        <InputLabel htmlFor="adornment-password1">New Password</InputLabel>
                        <Input
                            id="adornment-password1"
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword1}
                            onChange={this.handleNewPassword1Change}
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
                    <FormControl className={classNames(classes.margin, classes.textField)} fullWidth>
                        <InputLabel htmlFor="adornment-password2">Repeat New Password</InputLabel>
                        <Input
                            id="adornment-password2"
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword2}
                            onChange={this.handleNewPassword2Change}
                            onKeyPress={this.handlePasswordKeyPressed}
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
                    {error}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                        Close
                    </Button>
                    <Button disabled={this.state.newPassword2 === ''}  onClick={this.handleChangePassword} color="primary">
                        Change Password
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(ChangeLoginUserDialog);
