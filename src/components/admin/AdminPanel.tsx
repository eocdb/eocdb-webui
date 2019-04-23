import * as React from 'react';
import {Button, Theme, WithStyles} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';
import EditContentDialog from "./EditContentDialog";
import { Link } from "@material-ui/icons";

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
    saveLinksContent: (content: string) => void;
    linksContent: string;
}

class AdminPanel extends React.PureComponent<AdminPanelProps> {
    constructor(props: AdminPanelProps){
        super(props);
    }

    handleSave = (content: string) => {
        this.props.saveLinksContent(content);
        this.props.updateLinksContent(content);
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div>
                <Button
                    onClick={this.props.openLinksContentDialog}
                >
                    Edit Links
                    <Link/>
                </Button>
                <EditContentDialog
                    onClose={this.props.closeLinksContentDialog}
                    open={this.props.linksContentDialogOpen}

                    onSave={this.handleSave}
                    content={this.props.linksContent}
                />
            </div>
        );
    }
}

export default withStyles(styles)(AdminPanel);
