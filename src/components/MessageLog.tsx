import * as React from 'react';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';

import { MessageLogEntry } from '../types/messageLogState';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles = (theme: Theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

interface MessageLogContentProps extends WithStyles<typeof styles> {
    hideMessage: (messageId: number) => void;
    messageLogEntry: MessageLogEntry;
}

function MessageLogContent(props: MessageLogContentProps) {
    const {classes, hideMessage, messageLogEntry} = props;
    const messageId = messageLogEntry.id;
    const messageType = messageLogEntry.type;
    const messageText = messageLogEntry.text;
    const Icon = variantIcon[messageType];

    const elemId = `SnackBar-${messageId}`;
    const messageElem = (
        <span id={elemId} className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)}/>
            {messageText}
        </span>
    );

    return (
        <SnackbarContent
            className={classNames(classes[messageType])}
            aria-describedby={elemId}
            message={messageElem}
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => hideMessage(messageId)}
                >
                    <CloseIcon className={classes.icon}/>
                </IconButton>,
            ]}
        />
    );
}

const MessageLogContentWrapper = withStyles(styles)(MessageLogContent);

export interface MessageLogProps {
    messages: MessageLogEntry[];
    hideMessage: (messageId: number) => void;
}

export class MessageLog extends React.Component<MessageLogProps> {

    render() {
        const {messages, hideMessage} = this.props;
        const anchorOrigin = {
            vertical: 'bottom',
            horizontal: 'left',
        };
        const snackBars = [];
        for (const messageLogEntry of messages) {
            snackBars.push(
                <Snackbar
                    anchorOrigin={anchorOrigin as any}
                    open={true}
                    autoHideDuration={6000}
                    onClose={() => hideMessage(messageLogEntry.id)}
                >
                    <MessageLogContentWrapper
                        hideMessage={hideMessage}
                        messageLogEntry={messageLogEntry}
                    />
                </Snackbar>
            );
        }

        return <React.Fragment>{snackBars}</React.Fragment>;
    }
}
