import * as React from 'react';
import { MessageLogEntry } from '../../states/messageLogState';
import MessageLogContent from './MessageLogContent';
import { Snackbar } from "@mui/material";


interface MessageLogProps {
    messages: MessageLogEntry[];
    hideMessage: (messageId: number) => void;
}

class MessageLog extends React.Component<MessageLogProps> {

    render() {
        const {messages, hideMessage} = this.props;
        const snackBars = [];
        for (const messageLogEntry of messages) {
            snackBars.push(
                <Snackbar
                    key={messageLogEntry.id}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={true}
                    autoHideDuration={6000}
                    onClose={() => hideMessage(messageLogEntry.id)}
                >
                    <MessageLogContent
                        hideMessage={hideMessage}
                        messageLogEntry={messageLogEntry}
                    />
                </Snackbar>
            );
        }
        return <React.Fragment>{snackBars}</React.Fragment>;
    }
}

export default MessageLog;
