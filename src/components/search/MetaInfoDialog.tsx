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
import {Dataset, DatasetMetaData} from "../../types/dataset";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";


const styles = (theme: Theme) => createStyles({
        root: {},
    });

interface MetaInfoDialogProps extends WithStyles<typeof styles>{
    open: boolean;
    dataset: Dataset;

    handleClose: () => void;
}

class MetaInfoDialog extends React.Component<MetaInfoDialogProps>{
    constructor(props: MetaInfoDialogProps){
        super(props);
    }

    renderInfo(metadata: DatasetMetaData){
        return (
            <List>
                <div>
                    <ListItem>
                        <ListItemText primary={metadata.contact}/>
                    </ListItem>
                </div>
            </List>
        );
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
                        {this.renderInfo(this.props.dataset.metadata)}
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