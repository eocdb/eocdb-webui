import * as React from "react";

import { DialogTitle, Theme, WithStyles } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";


const styles = (theme: Theme) => createStyles({
    root: {
        marginLeft: theme.spacing() * 2.5,
    },
    select: {},
    dialogPaper: {
        minHeight: '30%',
        maxHeight: '100%',
        minWidth: '30%',
        maxWidth: '50%',
    },
});


interface HelpDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    onClose: () => void;

    title: string;
}


class HelpDialog extends React.Component<HelpDialogProps> {
    constructor(props: HelpDialogProps) {
        super(props);
    }

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    classes={{paper: classes.dialogPaper}}
                >
                    <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                    <DialogContent>
                        {this.props.children}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default withStyles(styles)(HelpDialog);
