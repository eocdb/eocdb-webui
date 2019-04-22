import * as React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import {Button, Theme, WithStyles} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';
import EditContentDialog from "./EditContentDialog";

// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles(
    {
        root: {},
        title: {
            flexGrow: 1,
        },
    });

interface AdminPanelProps extends WithStyles<typeof styles> {
    show: boolean;
    linksContentDialogOpen: boolean;
    openLinksContentDialog: () => void;
    closeLinksContentDialog: () => void;

    updateLinksContent: (content: string) => void;
}

class AdminPanel extends React.PureComponent<AdminPanelProps> {
    constructor(props: AdminPanelProps){
        super(props);
    }

    handleClose = () => {

    };

    render() {
        if (!this.props.show) {
            return null;
        }

        const {classes} = this.props;
        return (
            <div>
                <Typography
                    component="h1"
                    variant="h5"
                    color="inherit"
                    noWrap
                    className={classes.title}
                >
                    ADMIN
                </Typography>
                <Button
                    onClick={this.props.openLinksContentDialog}
                >
                    Open Link
                </Button>
                <EditContentDialog
                    handleClose={this.props.closeLinksContentDialog}
                    open={this.props.linksContentDialogOpen}

                    onSave={this.props.updateLinksContent}
                />
            </div>
        );
    }
}

export default withStyles(styles)(AdminPanel);
