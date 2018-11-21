import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";


const styles = (theme: Theme) => createStyles({
        root: {},
    });

interface MetaInfoDialogProps extends WithStyles<typeof styles>{
    id?: string;
    open: boolean;
    handleClose: () => void;
}

class MetaInfoDialog extends React.Component<MetaInfoDialogProps>{
    constructor(props: MetaInfoDialogProps){
        super(props);
    }

    render(){
        return(
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Settings</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Metainformation of dataset
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(MetaInfoDialog);