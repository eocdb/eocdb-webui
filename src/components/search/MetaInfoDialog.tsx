import * as React from "react";
import { WithStyles } from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles";

import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";


import { Dataset, DatasetMetaData } from "../../types/dataset";


const styles = () => createStyles({
    root: {},
});


interface MetaInfoDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    dataset: Dataset;

    handleClose: () => void;
}

class MetaInfoDialog extends React.Component<MetaInfoDialogProps> {
    constructor(props: MetaInfoDialogProps) {
        super(props);
    }

    // noinspection JSMethodCanBeStatic
    renderInfo(metadata: DatasetMetaData) {
        let items = [];
        for (let key in metadata) {
            items.push(
                <ListItem component={'span'} key={key}>
                    <ListItemText secondary={metadata[key]} primary={key}/>
                </ListItem>
            );
        }
        return (
            <List>
                {items}
            </List>
        );
    };

    render() {
        console.log(this.props.dataset);
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Settings</DialogTitle>
                <DialogContent>
                    {this.renderInfo(this.props.dataset.metadata)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(MetaInfoDialog);