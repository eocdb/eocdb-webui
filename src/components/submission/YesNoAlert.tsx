import * as React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";



interface YesNoAlertProperties{
    open: boolean;
    onClose: () => void;
    onAgree: (value: any) => void;

    value: any;
}

class YesNoAlert extends React.Component<YesNoAlertProperties> {
    constructor(props: YesNoAlertProperties) {
        super(props);
    }

    handleAgree = (value: any) => {
        this.props.onAgree(value)
    };

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Warning"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={() => this.handleAgree(this.props.value)} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default YesNoAlert;
