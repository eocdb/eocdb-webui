import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";



// const styles = (theme: Theme) => createStyles({
//     root: {
//         marginLeft: theme.spacing.unit * 2.5,
//     },
//     select: {},
//     dialogPaper: {
//         minHeight: '30%',
//         maxHeight: '100%',
//         minWidth: '30%',
//         maxWidth: '50%',
//     },
// });


interface HelpDialogProps {
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
        // const {classes} = this.props;

        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    // classes={{paper: classes.dialogPaper}}
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


export default HelpDialog;
