import * as React from 'react';
import 'jsoneditor-react/es/editor.min.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";


// // noinspection JSUnusedLocalSymbols
// const styles = (theme: Theme) => createStyles({
//     dialogContent: {
//         marginLeft: theme.spacing.unit * 4,
//         marginRight: theme.spacing.unit * 4,
//         marginTop: theme.spacing.unit * 4,
//         marginBottom: theme.spacing.unit * 4,
//     },
//     appBar: {
//         position: 'relative',
//     },
//     flex: {
//         flex: 1,
//     },
//     textField: {},
//     button: {},
//     rightIcon: {},
// });

interface UserRegistrationDialogProps {
    open: boolean;

    onClose?: () => void;
}

interface UserRegistrationDialogState {

}


class UserRegistrationDialog extends React.Component<UserRegistrationDialogProps, UserRegistrationDialogState> {
    constructor(props: UserRegistrationDialogProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.onClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">User Registration</DialogTitle>
                    <DialogContent>
                        <Typography>
                            To register, please contact <a
                            href="mailto:ops@eumetsat.int?Subject=Copernicus OCDB User Registration" target="_top">
                            Eumetsat Help Desk
                        </a>, providing a request for OC-DB registration, with your name, email and affiliation.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose} color="primary">
                            Close
                        </Button>
                        {/*<Button onClick={this.handleSave} color="primary">*/}
                        {/*Save*/}
                        {/*</Button>*/}
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default UserRegistrationDialog;
