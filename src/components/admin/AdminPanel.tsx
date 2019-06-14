import * as React from 'react';
import {Button, Theme, WithStyles} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import { withStyles } from '@material-ui/core/styles';
import EditContentDialog from "./EditContentDialog";
import Link from "@material-ui/icons/Link";
import Settings from "@material-ui/icons/Settings";
import ConfigDialog from "./ConfigDialog";
import EditJSON from "./JSONEdit";


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

    configDialogOpen: boolean;
    openConfigDialog: () => void;
    closeConfigDialog: () => void;

    apiServerUrl: string;
    configServer: (url: string) => void;
}

class AdminPanel extends React.PureComponent<AdminPanelProps> {
    constructor(props: AdminPanelProps){
        super(props);
    }

    handleSave = (content: string) => {
        this.props.saveLinksContent(content);
        this.props.updateLinksContent(content);
    };

    handleConfigOpen = () => {
        //console.log('test');
        this.props.openConfigDialog();
    };

    handleConfigClose = () => {
        this.props.closeConfigDialog();
    };

    handleApiServerUrlChange = (url: string) => {
        this.props.configServer(url);
        this.handleConfigClose();
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
                <Button
                    onClick={this.props.openConfigDialog}
                >
                    Settings
                    <Settings/>
                </Button>
                <EditJSON
                    open={true}
                />
                <EditContentDialog
                    onClose={this.props.closeLinksContentDialog}
                    open={this.props.linksContentDialogOpen}

                    onSave={this.handleSave}
                    content={this.props.linksContent}
                />
                <ConfigDialog open={this.props.configDialogOpen}
                              handleClose={this.handleConfigClose}
                              apiServerUrlChange={this.handleApiServerUrlChange}
                />
            </div>
        );
    }
}

export default withStyles(styles)(AdminPanel);
