import * as React from 'react';
import { MessageLogEntry } from '../../states/messageLogState';
import { Info, Error, CheckCircle, Warning, Close } from "@mui/icons-material";
import { IconButton, SnackbarContent } from "@mui/material";


const variantIcon = {
    success: CheckCircle,
    warning: Warning,
    error: Error,
    info: Info,
};

// const styles = (theme: Theme) => createStyles(
//     {
//         success: {
//             backgroundColor: green[600],
//         },
//         error: {
//             backgroundColor: theme.palette.error.dark,
//         },
//         info: {
//             backgroundColor: theme.palette.primary.dark,
//         },
//         warning: {
//             backgroundColor: amber[700],
//         },
//         icon: {
//             fontSize: 20,
//         },
//         iconVariant: {
//             opacity: 0.9,
//             marginRight: theme.spacing.unit,
//         },
//         message: {
//             display: 'flex',
//             alignItems: 'center',
//         },
//     });

interface MessageLogContentProps {
    hideMessage: (messageId: number) => void;
    messageLogEntry: MessageLogEntry;
}

function MessageLogContent(props: MessageLogContentProps) {
    const {hideMessage, messageLogEntry} = props;
    const messageId = messageLogEntry.id;
    const messageType = messageLogEntry.type;
    const messageText = messageLogEntry.text;
    const Icon = variantIcon[messageType];

    const elemId = `SnackBar-${messageId}`;
    const messageElem = (
        <span id={elemId}>
          <Icon/>
            {messageText}
        </span>
    );

    return (
        <SnackbarContent
            // className={classNames(classes[messageType])}
            aria-describedby={elemId}
            message={messageElem}
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => hideMessage(messageId)}
                >
                    <Close/>
                </IconButton>,
            ]}
        />
    );
}

export default MessageLogContent;
