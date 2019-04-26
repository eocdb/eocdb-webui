import * as React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { MessageLogEntry } from '../../states/messageLogState';
import createStyles from '@material-ui/core/styles/createStyles';
import MessageLogContent from './MessageLogContent';

// noinspection JSUnusedLocalSymbols
const styles = (theme: Theme) => createStyles({});

interface MessageLogProps extends WithStyles<typeof styles> {
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

export default withStyles(styles)(MessageLog);
