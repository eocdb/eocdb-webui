import * as React from "react";
import { Icon, IconButton, Typography, WithStyles } from "@material-ui/core";
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


import { Dataset } from "../../model";
import { DatasetMetaData } from "../../types/dataset";
import HelpDialog from "../messages/HelpDialog";
import { MetaInfoHelpText } from "../messages/Help/MetaInfo";



const styles = () => createStyles({
    root: {},
    helpDialog: {
        minHeight: '4em'
    }
});


interface MetaInfoDialogProps extends WithStyles<typeof styles> {
    open: boolean;
    dataset: Dataset;

    handleClose: () => void;

    helpDialogOpen: boolean;
    closeHelpDialog: () => void;
    openHelpDialog: (helpMetaInfoKey: string) => void;
    helpMetaInfoKey: string;
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
                    <IconButton
                        onClick={() => this.props.openHelpDialog(key)}
                    >
                        <Icon color={"secondary"}>
                            help
                        </Icon>
                    </IconButton>
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
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Settings</DialogTitle>
                <DialogContent>
                    {this.renderInfo(this.props.dataset.metadata)}
                    <HelpDialog
                        open={this.props.helpDialogOpen}
                        onClose={this.props.closeHelpDialog}
                        title={'Meta Info Help'}
                    >
                        <Typography variant="button" gutterBottom>
                            {this.props.helpMetaInfoKey}
                        </Typography>
                        <Typography component={'p'}>
                            {MetaInfoHelpText[this.props.helpMetaInfoKey]}
                        </Typography>
                    </HelpDialog>

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