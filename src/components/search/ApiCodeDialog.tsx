import * as React from "react";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";


interface APICodeDialogProps {
    open: boolean;
    query: string;

    onClose: () => void;
}


class APICodeDialog extends React.Component<APICodeDialogProps> {
    constructor(props: APICodeDialogProps) {
        super(props);
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Settings</DialogTitle>
                <DialogContent>
                    <SyntaxHighlighter language='python'>
                        {`from ocdb.OCDBApi import new_api\n\napi = new_api()\n\napi.find_datasets(${this.props.query})`}
                    </SyntaxHighlighter>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default APICodeDialog;
