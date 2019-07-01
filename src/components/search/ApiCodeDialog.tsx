import * as React from "react";
import { WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import SyntaxHighlighter from 'react-syntax-highlighter';


const styles = () => createStyles({
    root: {},
    helpDialog: {
        minHeight: '4em'
    }
});


interface APICodeDialogProps extends WithStyles<typeof styles> {
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

export default withStyles(styles)(APICodeDialog);