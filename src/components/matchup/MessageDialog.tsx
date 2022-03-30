import * as React from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions
} from "@mui/material";


interface MessageDialogProps {
    open: boolean;
    title: string;
    msg: string;
    onClose: () => void;
}


export default function MessageDialog(props: MessageDialogProps) {
    const msg = props.msg;

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
        >
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                {msg}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}
                        aria-label="Close"
                        variant="contained"
                        color="secondary"
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

